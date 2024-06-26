const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  ROLE: {
    IS_ADMIN: {
      type: Boolean
    },
    IS_ORGANIZATION: {
      type: Boolean
    },
  },
  USERNAME: {
    type: String,
    index: true
  },
  PASSWORD: {
    type: String,
  },
  FULLNAME: {
    type: String,
    index: true
  },
  PHONE: {
    type: String,
    index: true
  },
  EMAIL: {
    type: String,
  },
  OTP: [{
    TYPE: {
      type: String
    },
    CODE: {
      type: String
    },
    TIME: {
      type: Date
    },
    EXP_TIME: {
      type: Date
    },
    CHECK_USING: {
      type: Boolean
    },
  }],
  IS_BLOCKED: {
    TIME: {
      type: Date
    },
    CHECK: {
      type: Boolean
    },
    BLOCK_BY_USER_ID: {
      type: Schema.Types.ObjectId
    }
  },
  IS_ACTIVATED: {
    type: Boolean
  },
  AVATAR: {
    type: String
  },
  ORGANIZATION_ID: {
    type: Schema.Types.ObjectId
  },
  ADDRESS: {
    type: String,
  },
  GENDER: {
    type: String,
  }
});

module.exports = mongoose.model("User", UserSchema);
