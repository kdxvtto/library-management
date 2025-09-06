const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
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
    joinDate : {
        type : Date,
        default : Date.now
    }
},
{
    timestamps : true
})

adminSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew){
        if(this.password.length < 8){
            return next(new Error('Password must be at least 8 characters long'));
        }
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});

module.exports = mongoose.model('Admin', adminSchema);

    