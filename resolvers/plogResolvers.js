const PlogModel = require("../models/plogsModel");

module.exports = {
    Query: {
      Plogs: async (_,{filter}) => {
        try {
            const query = filter ? { $or: [{ country: filter.country }, { age: filter.age }] } : {};
            const documents = await PlogModel.find(query).populate('user');
            return documents;
          } catch (error) {
            console.error("Error retrieving documents:", error);
            throw new Error("Failed to retrieve documents.");
          }
          
      },
      PlogById: async (_, { id }) => {
        try {
          const document = await PlogModel.findById(id);
          return document;
        } catch (error) {
          console.error("Error retrieving document:", error);
          throw new Error("Failed to retrieve document.");
        }
      },
    },
    Mutation: {
      createPlog: async (_, { args }) => {
        try {
          const document = await PlogModel.create(args);
          return document;
        } catch (error) {
          console.error("Error creating document:", error);
          throw new Error("Failed to create document.");
        }
      },
    },
  };