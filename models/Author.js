const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    biography : {
        type : String
    },
    birthDate : {
        type : Date
    },
    nationality : {
        type : String
    },
    photo : {
        type : String
    },
    isActive : {
        type : Boolean,
        default : true
    }
},
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Author', authorSchema);