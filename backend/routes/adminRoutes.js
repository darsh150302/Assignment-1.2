const express = require('express');
const { getDashboard, deleteUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboard);
router.delete('/users/:id', protect, adminOnly, deleteUser);

module.exports = router;
