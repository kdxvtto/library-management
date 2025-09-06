const express = require('express');
const router = express.Router();
const { addAdminValidation, updateAdminValidation } = require('../middleware/adminValidation');

const {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controllers/adminController');

router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.post('/', addAdminValidation, addAdmin);
router.put('/:id', updateAdminValidation, updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;