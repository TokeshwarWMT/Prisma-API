const express = require('express');
const router = express.Router();

const userController = require('../controllers/userCon');
// const { auth } = require('../helpers/jwt');

router.post('/create', userController.register);
router.post('/login', userController.login);

router.get('/getUser/:id', userController.getUser);

router.put('/updateUser/:id', userController.updateUser);

router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;