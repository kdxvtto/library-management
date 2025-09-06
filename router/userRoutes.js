const express = require('express');
const router = express.Router();
const { addUserValidation, updateUserValidation } = require('../middleware/userValidation');

const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUserValidation, addUser);
router.put('/:id', updateUserValidation, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;