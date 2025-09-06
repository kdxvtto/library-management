const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true
    },
    membership : {
        type : String,
        enum : ['basic', 'premium', 'student'],
        default : 'basic'
    },
    isActive : {
        type : Boolean,
        default : true
    },
    joinDate : {
        type : Date,
        default : Date.now
    },
    maxBorrowLimit : {
        type : Number,
        default : 3
    }
},
{
    timestamps : true
}
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew){
        if (this.password.length < 8){
            throw new Error('Password must be at least 8 characters')
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

module.exports = mongoose.model('User', userSchema);