const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin')

router.get('/', AdminController.admin_get_all_admins);

router.post('/signup', AdminController.admin_signup);

router.post('/login', AdminController.admin_login);

router.delete('/:username', AdminController.admin_delete_admin);

module.exports = router;