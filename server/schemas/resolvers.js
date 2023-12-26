const userController = require('../controllers/user-controller');

const resolvers = {
  Query: {
    me: userController.getSingleUser,
  },
  Mutation: {
    login: userController.login,
    addUser: userController.createUser,
    saveBook: userController.saveBook,
    removeBook: userController.deleteBook,
  },
};

module.exports = resolvers;
