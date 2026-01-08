const asyncHandler = require("express-async-handler");
const {
  calculateNextBillingDate,
} = require("../utils/calculateNextBillingDate");
const {
  shouldRenewSubscriptionPlan,
} = require("../utils/shouldRenewSubscriptionPlan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const User = require("../models/User");
// stripe payment
const handleStripePayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  // get the user
  const user = req.user;
  try {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: "usd",
      metadata: {
        userId: user._id.toString(),
        userEmail: user.email,
        subscriptionPlan,
      },
    });
    console.log(paymentIntent);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
      metadata: paymentIntent.metadata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// verify payment
const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      // get the info from metadata
      const metadata = paymentIntent.metadata;
      const subscriptionPlan = metadata.subscriptionPlan;
      const userEmail = metadata.userEmail;
      const userId = metadata.userId;

      // find the user
      const userFound = await User.findById(userId);
      if (!userFound) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
      // get the payment details
      const amount = paymentIntent.amount / 100; // convert to dollars
      const currency = paymentIntent.currency;
      const paymentId = paymentIntent.id;

      // create the payment history
      const newPayment = await Payment.create({
        user: userId,
        subscriptionPlan,
        email: userEmail,
        amount,
        reference: paymentId,
        currency,
        status: "success",
      });

      // check for the subscription plan and update the user accordingly
      if (subscriptionPlan === "Basic") {
        const updateUser = await User.findByIdAndUpdate(userId, {
          monthlyRequestCount: 50,
          apiRequestCount: 0,
          nextBillingDate: calculateNextBillingDate(),
          trialPeriod: 0,
          subscriptionPlan: "Basic",
          $addToSet: { payments: newPayment._id },
        });

        res.json({
          status: true,
          message: "Subscription updated to Basic plan",
          updateUser,
        });
      }
      if (subscriptionPlan === "Premium") {
        const updateUser = await User.findByIdAndUpdate(userId, {
          monthlyRequestCount: 100,
          apiRequestCount: 0,
          nextBillingDate: calculateNextBillingDate(),
          trialPeriod: 0,
          subscriptionPlan: "Premium",
          $addToSet: { payments: newPayment._id },
        });

        res.json({
          status: true,
          message: "Subscription updated to Premium plan",
          updateUser,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// handle free subscription plan
const handleFreeSubscription = asyncHandler(async (req, res) => {
  // get the login user
  const user = req.user;

  // check if the user account should be renewed or not
  try {
    if (shouldRenewSubscriptionPlan(user)) {
      // update the user account
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate();
      // create new payment and save into DB
      const newPayment = await Payment.create({
        user: user._id,
        subscriptionPlan: "Free",
        amount: 0,
        status: "success",
        reference: Math.random().toString(36).substring(7),
        monthlyRequestCount: 5,
        currency: "usd",
      });
      // push the payment into user payments array
      user.payments.push(newPayment._id);
      // save the user
      await user.save();
      // send the response
      return res.json({
        message: "Subscription plan updated successfully",
        status: "success",
        user,
      });
    } else {
      res.status(400);
      throw new Error("Subscription plan is still active");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = { handleStripePayment, handleFreeSubscription, verifyPayment };
