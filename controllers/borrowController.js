const Borrow = require('../models/Borrow')

const getAllBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find()
        res.status(200).json(borrows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addBorrowBook = async (req,res) => {
    try{
        const {
            user,
            book,
            borrowDate,
            returnDate,
            dueDate,
            status,
            fine
        } = req.body
        const borrow = new Borrow({
            user,
            book,
            borrowDate,
            returnDate,
            dueDate,
            status,
            fine
        })
        const newBorrow = await borrow.save()
        res.status(200).json({
            success : true,
            data : newBorrow
        })
    } catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

const deleteBorrowBook = async (req,res) => {
    try {
        const findBorrow = await Borrow.findById(req.params.id)
        if(!findBorrow){
            return res.status(404).json({
                success : false,
                message : 'Borrow not found'
            })
        }
        const borrow = await Borrow.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success : true,
            data : borrow
        })
    } catch (err) {
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

module.exports = {
    getAllBorrows,
    addBorrowBook,
    deleteBorrowBook
}