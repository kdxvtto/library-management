const User = require('../models/User')

const getAllUsers = async (req,res) => {
    try{
        const users = await User.find()
        res.status(200).json({
            success : true,
            data : users
        })
    }
    catch(err){
        next(err)
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
        res.status(200).json({
            success : true,
            data : user
        })
    }catch (err) {
        next(err)
    }
}

const addUser = async (req,res) =>{
    try{
        const {
            name,
            email,
            password,
            address,
            membership,
            isActive,
            joinDate,
            maxBorrowLimit
        } = req.body
        const user = new User({
            name,
            email,
            password,
            address,
            membership,
            isActive,
            joinDate,
            maxBorrowLimit
        })
        if(!name || !email || !password || !address){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            })
        }
       const newUser = await user.save()
        res.status(200).json({
            success : true,
            data : newUser
        })
    }
    catch(err){
        next(err)
    }
}

const updateUser = async (req,res) =>{
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            success : true,
            data : user
        })
    }
    catch(err){
        next(err)
    }
}

const deleteUser = async (req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success : true,
            data : user
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}