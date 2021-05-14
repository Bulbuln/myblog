const mongoose = require('mongoose');
const crypto = require('crypto');
const { timeStamp } = require('console');
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "please enter an username"],
        maxLength: 32,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, "please enter a name"],
        maxLength: 32,
        
    },
    email: {
        type: String,
        trim: true,
        required: [true, "please enter an email"],
        maxLength: 32,
        unique: true,
        validate: [isEmail, "please enter a valid email"]
        
    },
    profile: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minLength: [6, "your password too short"]
    },
    
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamp: true});


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if ( user ) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }

        throw Error('incorrect Password')
        
    }

    throw Error('incorrect email')

}

const User = mongoose.model('User', userSchema);

module.exports = User
