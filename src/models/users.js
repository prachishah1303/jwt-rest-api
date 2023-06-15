const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var crypto = require('crypto');
const config = require( "./../config" );

const userSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    name: {
      type: String,
      // required: true,
      minlength: 3,
    },
    email: {
      type: String,
      // required: true,
      // unique: [true, "Email is already present"],
      // validate(value) {
      //     if (!validator.isEmail(value)) {
      //         throw new Error("Invalid Email")
      //     }
      // }
    },
    address: {
      type: String,
      // required: true
    },
    password: {
      type: String,
      // required: true
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    }
  }
}, { timestamps: true });


userSchema.pre('save', async function( next ) {
  try {
    
    if(this.method !== 'local') {
      next();
    }
    var cipher = crypto.createCipher(config.cryptoAlgo, config.cryptoKey);
    var encrypted = cipher.update(this.local.password, 'utf8', 'hex')+cipher.final('hex');
 
    this.local.password = encrypted;
    next();
  } catch(error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = function( password ) {
  try {
    var decipher = crypto.createDecipher(config.cryptoAlgo, config.cryptoKey);
    var decrypted = decipher.update(this.local.password, 'hex', 'utf8') + decipher.final('utf8');

    return decrypted === password
  } catch(error) {
    throw new Error(error);
  }
};


const User = mongoose.model('users', userSchema);
module.exports = User;