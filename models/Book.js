const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    ISBN : {
        type : String,
        required : true,
        unique : true,
        // validate : {
        //     validator : function(value) {
        //         return /^[0-9]{13}$/.test(value);
        //     }
        // }
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author',
        required : true
    },
    categories : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
    }],
    description : {
        type : String
    },
    publisher : {
        type : String
    },
    publishedYear : {
        type : Number
    },
    pages : {
        type : Number
    },
    language : {
        type : String,
        default : 'English'
    },
    copies : {
        type : Number,
    },
    availableCopies : {
        type : Number,
        default : 1
    },
    location : {
        type : String
    },
    coverImage : {
        type : String
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        default : 1
    },
    totalReview : {
        type : Number,
        default : 0
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

module.exports = mongoose.model('Book', bookSchema);