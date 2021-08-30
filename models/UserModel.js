const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const USER_SCHEMA = {
  code: {
    type: mongoose.Schema.Types.String,
    unique: true
  },
  firstName: mongoose.Schema.Types.String,
  lastName: mongoose.Schema.Types.String,
  email: {
    type: mongoose.Schema.Types.String,
    unique: true
  },
  phone: {
    number: mongoose.Schema.Types.String
  },
  confirmed: mongoose.Schema.Types.Boolean,
  auth: {
    code: mongoose.Schema.Types.String,
    createdAt: mongoose.Schema.Types.Date,
    provider: {
      type: mongoose.Schema.Types.String,
      get(authProvider) {
        return authProvider || 'local';
      }
    }
  },
  registrationCompleted: mongoose.Schema.Types.Boolean,
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
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
