const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', verifyToken, checkRole('admin'), addBook);
router.put('/:id', verifyToken, checkRole('admin'), updateBook);
router.delete('/:id', verifyToken, checkRole('admin'), deleteBook);

module.exports = router;
