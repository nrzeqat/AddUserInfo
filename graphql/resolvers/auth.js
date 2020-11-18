const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      var e=args.userInput.email;

      if(!e.includes('@')){
      throw new Error('Email Format not correct.');
    }
      if (existingUser) {
        throw new Error('User exists already.');
      }
      
      const user = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email
      });

      const result = await user.save();

      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
   
    return { userId: user.id, firstName:user.firstName, lastName:user.lastName};
  }
};
