const mongoose = require('mongoose');

const Category = require('../models/Category');

const getAllCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success : true,
            data : categories
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const getCategoryById = async (req,res) =>{
    try{
        const category = await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({
                success : false,
                message : 'Category not found'
            })
        }
        res.status(200).json({
            success : true,
            data : category
        })
    }
    catch(err){
        next(err)
    }
}

const addCategory = async (req,res) => {
    try {
        const {name, description, isActive} = req.body
        const category = new Category({
            name,
            description,
            isActive
        })
        if(!name){
            return res.status(400).json({
                success : false,
                message : 'name is required'
            })
        }
        const newCategory = await category.save()
        res.status(201).json({
            success : true,
            data : newCategory
        })
    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req,res) =>{
    try{
        const categories = await Category.findById(req.params.id)
        if(!categories){
            return res.status(404).json({
                success : false,
                message : 'Category not found'
            })
        }
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            success : true,
            data : category
        })
    }
    catch(err){
        next(err)
    }
}

const deleteCategory = async (req,res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id)
        if(!category){
            return res.status(404).json({
                success : false,
                message : 'Category not found'
            })
        }
        res.status(200).json({
            success : true,
            data : category
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}