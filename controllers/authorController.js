const Author = require('../models/Author');

const getAllAuthors = async (req,res) =>{
    try {
        const {
            search,
            birthDate,
            nationality,
            isActive,
            page = 1,
            limit = 5
        } = req.query

        const filter = {}

        if(search){
            filter.name = {$regex : search, $options : 'i'}
        }
        if (birthDate) {
            filter.birthDate = birthDate
        }
        if (nationality) {
            filter.nationality = nationality
        }
        if (isActive) {
            filter.isActive = isActive
        }

        let query = Author.find(filter)
        const skip = (page - 1) * parseInt(limit)
        query = query.skip(parseInt(skip)).limit(parseInt(limit))
        const authors = await query
        const total = await Author.countDocuments(filter)
        

        res.status(200).json({
            success : true,
            data : authors,
            totalAuthors : total,
            pages :{
                current : page,
                total : Math.ceil(total/limit),
                hasNext : page < Math.ceil(total/limit),
                hasPrevious : page > 1
            }
        })
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

const getAuthorById = async (req,res) =>{
    try{
        const author = await Author.findById(req.params.id)
        if(!author){
            return res.status(404).json({
                success : false,
                message : 'Author not found'
            })
        }
        res.status(200).json({
            success : true,
            data : author
        })
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

const addAuthor = async (req,res) => {
   try {
        const {
            name,
            biography,
            birthDate,
            nationality,
            photo,
            isActive
        } = req.body
        const author = new Author({
            name,
            biography,
            birthDate,
            nationality,
            photo,
            isActive
        })
        if(!name){
            return res.status(400).json({
                success : false,
                message : 'name is required'
            })
        }
        const newAuthor = await author.save()
        res.status(200).json({
            success : true,
            data : newAuthor
        })
   } catch (err) {
        res.status(400).json({
            success : false,
            message : err.message
        })

    }
}

const updateAuthor = async (req,res) => {
    try{
        const findAuthor = await Author.findById(req.params.id)
        if(!findAuthor){
            return res.status(404).json({
                success : false,
                message : 'Author not found'
            })
        }
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            success : true,
            data : author
        })
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

const deleteAuthor = async (req,res) =>{
    try {
        const author = await Author.findByIdAndDelete(req.params.id)
        if(!author){
            return res.status(404).json({
                success : false,
                message : 'Author not found'
            })
        }
        res.status(200).json({
            success : true,
            data : author
        })
    } catch (err) {
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
}