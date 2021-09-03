const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const USER_SCHEMA = {
  username: {
    type: mongoose.Schema.Types.String,
    unique: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true
  },
  name: mongoose.Schema.Types.String,
  emailConfirmed: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  registrationCompleted: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  oneTimePassword: {
    code: mongoose.Schema.Types.String,
    createdAt: mongoose.Schema.Types.Date,
  },
  planCode: mongoose.Schema.Types.String,
  profilePhoto: mongoose.Schema.Types.String
};

const schema = new mongoose.Schema(USER_SCHEMA, {
  autoCreate: true,
  strict: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

schema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update']
});

module.exports = mongoose.model('users', schema);
