const { default: mongoose } = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Category = require('../models/Category');

const getAllBooks = async (req, res, next) => {
    try {
        const {
            search,
            page = 1,
            limit = 10,
        } = req.query;

        const filter = {}

        if(search){
            const author = await Author.findOne({name : {$regex : search, $options : 'i'}})
            const searchCondition = [
                { title : {$regex : search, $options : 'i'} },
                { ISBN : {$regex : search, $options : 'i'} }
        ]
            if(author){
                searchCondition.push({author : author._id})
            }
            filter.$or = searchCondition
        }


        let query = Book.find(filter).populate({
            path : 'author',
            select : 'name'
        })
        const skip = (page - 1) * parseInt(limit)
        query = query.skip(parseInt(skip)).limit(parseInt(limit))

        const books = await query
        const total = await Book.countDocuments(filter)

        res.status(200).json({
            success : true,
            data : books,
            totalBooks : total,
            page : {
                currentPage : page,
                totalPage : Math.ceil(total / limit),
                hasNext : page  < Math.ceil(total / limit),
                hasPrev : page > 1
            }
        })
}
    catch (err) {
        next(err)
    }
}

const getBookById = async (req,res, next) =>{
   try{
        const book = await Book.findById(req.params.id)
        if (!book){
            return res.status(404).json({
                success : false,
                message : 'Book not found'
            })
        }
        res.status(200).json({
            success : true,
            data : book
        })
    }
    catch(err){
        next(err)
    }
}

const addBook = async (req,res, next) => {
    try {
        const {author, categories, title, ISBN} = req.body

        const book = new Book({
            title, 
            ISBN,
            author,
            categories
        })
        if(!book){
            return res.status(400).json({
                success : false,
                message : 'Invalid book data'
            })
        }
        const newBook = await book.save()
        res.status(201).json({
            success : true,
            data : newBook
        })
        
    } catch (err) {
        next(err)
    }
}

const updateBook = async (req,res,next) =>{
    try {
        const findBook = await Book.findById(req.params.id)
        if(!findBook){
            return res.status(404).json({
                success : false,
                message : 'Book not found'
            })
        }
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            success : true,
            data : book
        })
    } catch (err) {
        next(err)
    }
}

const deleteBook = async (req,res,next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if(!book){
            return res.status(404).json({
                success : false,
                message : 'Book not found'
            })
        }
        res.status(200).json({
            success : true,
            data : book
        })
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}