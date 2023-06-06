const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const db = require("./data/db");
const PlogModel = require("./models/plogsModel");
const CompanyModel = require("./models/companyModel");
const UserModel = require("./models/usersModel");
const { fillRelationships } = require("./fakeData");
const typeDefs = require("./types/plogTypes");
const resolvers = require("./resolvers/plogResolvers");
const { GraphQLError } =require('graphql');


const server = new ApolloServer({
  typeDefs,
  resolvers,
 

});

function validateToken(token) {
  if (token == 1234) {
    return { isLogged : true };
  }
  else{
    return { isLogged : false };
  }

}

const port = process.env.PORT || 5000;
startStandaloneServer(server, {
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    const user = validateToken(token);

    return { user };
  },
  listen: { port },
}).then(({ url }) => {
  console.log(`running. .. : ${url}`);
})
.catch((error) => {
  console.error('Failed to start server:', error);
});
