const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id }).populate("savedBooks");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
        console.log("Cannot login");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );
    },
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
