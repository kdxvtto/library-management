const express = require('express');
const router = express.Router();

const {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', addAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
