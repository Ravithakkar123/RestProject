const express = require('express');
const userController = require('../controller/user.controller');

var router = express.Router();





router.post('/signup-user', userController.signUpUser);
router.post('/signup-shop', userController.signUpShop);
router.post('/login-user' , userController.loginUser);
router.post('/login-shop' , userController.loginShop);
// router.get('/get-all-client' , userController.getAllClient);
// router.post('/get-client-by-id/:id' , userController.getClientById);
// router.put('/update-client-by-id', upload ,userController.updateClientById);
// router.post('/delete-client-by-id/:id' , userController.deleteClientById);

// router.post('/delete-client-without-invoice/:id', userController.deleteUserWithoutInvoice);
module.exports = router;