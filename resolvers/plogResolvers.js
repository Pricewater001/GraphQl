const PlogModel = require("../models/plogsModel");
const UserModel = require("../models/usersModel");
const CompanyModel = require("../models/companyModel");

module.exports = {
  Query: {
    Plogs: async (_, { filter }) => {
      try {
        const query = filter
          ? { $or: [{ country: filter.country }, { age: filter.age }] }
          : {};
        const documents = await PlogModel.find(query).populate("user");
        return documents;
      } catch (error) {
        console.error("Error retrieving documents:", error);
        throw new Error("Failed to retrieve documents.");
      }
    },

    Users: async (parent, args, { user }) => {
      try {
        if (!user.isLogged) {
          return {
            error: true,
            message: "Not Authorized",
          };
        }

        const documents = await UserModel.find();

        return documents;
      } catch (err) {
        console.log(err);
      }
    },

    Companies: async (_, args) => {
      try {
        const documents = await CompanyModel.find();
        return documents;
      } catch (err) {
        console.log(err);
      }
    },

    PlogById: async (_, { id }) => {
      try {
        console.log(id);
        const document = await PlogModel.findOne({ id });
        console.log(
          "🚀 ~ file: plogResolvers.js:21 ~ PlogById: ~ document:",
          document
        );

        return document;
      } catch (error) {
        console.error("Error retrieving document:", error);
        throw new Error("Failed to retrieve document.");
      }
    },
  },

  Mutation: {
    createPlog: async (_, args) => {
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
