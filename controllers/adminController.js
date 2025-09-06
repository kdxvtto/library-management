const Admin = require('../models/Admin')

const getAllAdmins = async (req,res) => {
    try{
        const admin = await Admin.find()
        res.status(200).json({
            success : true,
            data : admin
        })
    }
    catch(err){
        next(err)
    }
}

const getAdminById = async (req,res) => {
    try{
        const admin = await Admin.findById(req.params.id)
        if(!admin){
            return res.status(404).json({
                success : false,
                message : 'Admin not found'
            })
        }
        res.status(200).json({
            success : true,
            data : admin
        })
    } catch (err) {
        next(err)
    }
}

const addAdmin = async (req,res) => {
    try{
        const {name,email,password} = req.body
        const admin = new Admin({
            name,
            email,
            password
        })
       const newAdmin =  await admin.save()
        res.status(200).json({
            success : true,
            data : newAdmin
        })
    } catch(err){
        next(err)
    }
}

const updateAdmin = async (req,res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        )
        if(!admin){
            return res.status(404).json({
                success : false,
                message : 'Admin not found'
            })
        }
        res.status(200).json({
            success : true,
            data : admin
        })
    } catch (err) {
        next(err)
    }
}

const deleteAdmin = async (req,res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id)
        if(!admin){
            return res.status(404).json({
                success : false,
                message : 'Admin not found'
            })
        }
        res.status(200).json({
            success : true,
            data : admin
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin
}