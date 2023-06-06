const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const db = require("./data/db");
const PlogModel = require("./models/plogsModel");
const CompanyModel = require("./models/companyModel");
const UserModel = require("./models/usersModel");
const { fillRelationships } = require("./fakeData");
const typeDefs = require("./types/plogTypes");
const resolvers = require("./resolvers/plogResolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 5000;
startStandaloneServer(server, {
  listen: { port },
}).then(async ({ url }) => {

  // fillRelationships();


  console.log(`running. .. : ${url}`);
});
