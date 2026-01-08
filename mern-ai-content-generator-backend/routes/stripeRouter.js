const express = require("express");
const {handleStripePayment, handleFreeSubscription, verifyPayment} = require("../controllers/handleStripePayment");
const isAuthenticated = require("../middlewares/isAuthenticated");
const stripeRouter = express.Router();

stripeRouter.post("/checkout", isAuthenticated, handleStripePayment);
stripeRouter.post("/free-plan", isAuthenticated, handleFreeSubscription);
stripeRouter.post("/verify-payment/:paymentId", isAuthenticated, verifyPayment);

module.exports = stripeRouter;