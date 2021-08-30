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
  firstName: mongoose.Schema.Types.String,
  lastName: mongoose.Schema.Types.String,
  confirmed: mongoose.Schema.Types.Boolean,
  auth: {
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
