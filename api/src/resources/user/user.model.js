import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // role must be 100 for admin
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// snippet from Scott Moss's course API design V3
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

// snippet from Scott Moss's course API design V3
userSchema.methods.checkPassword = function (password) {
  var passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
