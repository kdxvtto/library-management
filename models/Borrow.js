const mongoose = require('mongoose');

const borrowSchema  = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        required : true
    },
    borrowDate : {
        type : Date,
        default : Date.now
    },
    dueDate : {
        type : Date,
        required : true
    },
    returnDate : {
        type : Date
    },
    status : {
        type : String,
        enum : ['active', 'lost', 'returned', 'overdue'],
        default : 'active'
    },
    fine : {
        type : Number,
        default : 0
    },
    notes : {
        type : String
    }
},
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Borrow', borrowSchema);