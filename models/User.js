
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email:{ type: String,
            lowercase: true,
            unique:true,
            required: [true,'Please enter an email address'],
            validate: [isEmail,'Please enter a valid email'],

    },
    password:{  type: String,
                minlength: [6, 'Minimum password character is 6'],
                required: [true,'Please enter a password'],

    },
})

userSchema.pre('save', async function(next)
{
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);

    next()
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email });
    if (user) {

      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
          
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
const User = mongoose.model('user', userSchema)
module.exports= User;