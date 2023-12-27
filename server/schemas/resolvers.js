const userController = require("../controllers/user-controller");
const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: userController.getSingleUser,
  },
  Mutation: {
    login: async () => {
      userController.login;
    },
    addUser: async (parent, { username, email, password }) => {
      const body = { username, email, password };
      return userController.createUser({ body });
    },
    saveBook: userController.saveBook,
    removeBook: userController.deleteBook,
  },
};

module.exports = resolvers;
