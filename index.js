const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const db = require("./data/db");

// const CompanyModel = require("./models/companyModel");
// const { fillRelationships } = require("./fakeData");
const typeDefs = require("./types/plogTypes");
const resolvers = require("./resolvers/plogResolvers");
const { GraphQLError } = require("graphql");
// require("./fakedata2");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

function validateToken(token) {
  if (token == 1234) {
    return { isLogged: true };
  } else {
    return { isLogged: false };
  }
}

const port = process.env.PORT || 5000;
startStandaloneServer(server, {
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("Please provide authentication token.");
      error.statusCode = 404;
      throw error;
    }

    const user = validateToken(token);

    return { user };
  },
  listen: { port },
})
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    response.status(statusCode).json({ error: errorMessage });
  });
