const express = require('express')
const router = express.Router()
const { getAllBorrows, addBorrowBook, deleteBorrowBook } = require('../controllers/borrowController')

router.get('/', getAllBorrows)
router.post('/', addBorrowBook)
router.delete('/:id', deleteBorrowBook)

module.exports = router