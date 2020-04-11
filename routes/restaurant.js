const express = require('express');
const restaurantController = require('../controller/restaurant.controller');

var router = express.Router();





router.get('/get-restaurants', restaurantController.getAllRestaurants);
router.get('/get-restaurant-by-id/:id', restaurantController.getRestaurantById);
router.get('/get-restaurant-food-by-id/:id', restaurantController.RestaurantFoodById);

router.post('/add-food-item', restaurantController.addFoodItemById)
router.post('/edit-food-item-by-id', restaurantController.editFoodItem)
router.delete('/delete-food-item-by-id/:id', restaurantController.removeFoodItem)


router.post('/get-cart-by-id', restaurantController.getCartById);
router.post('/add-food-item-to-cart', restaurantController.addToCart);
router.post('/remove-food-item-to-cart', restaurantController.removeFromCart);

router.get('/get-payment-record/:id', restaurantController.checkPaymentDetails);
router.post('/add-payment-record', restaurantController.addPaymentDetials);

router.post('/add-order', restaurantController.addOrder);

router.post('/get-order-by-id', restaurantController.getOrderById);
// router.post('/signup-shop', userController.signUpShop);
// router.post('/login-user' , userController.loginUser);
// router.post('/login-shop' , userController.loginShop);
// router.get('/get-all-client' , userController.getAllClient);
// router.post('/get-client-by-id/:id' , userController.getClientById);
// router.put('/update-client-by-id', upload ,userController.updateClientById);
// router.post('/delete-client-by-id/:id' , userController.deleteClientById);

// router.post('/delete-client-without-invoice/:id', userController.deleteUserWithoutInvoice);
module.exports = router;