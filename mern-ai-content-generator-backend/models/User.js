const mongoose = require("mongoose");

// schema definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trialPeriod: {
      type: Number,
      default: 3, // days
    },
    trialActive: {
      type: Boolean,
      default: true,
    },
    trialExpires: {
      type: Date,
    },
    subscriptionPlan: {
      type: String,
      enum: ["Trial", "Free", "Basic", "Premium"],
      default: "Trial",
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 100, // 100 requests per month for free tier // 3 days
    },
    nextBillingDate: {
      type: Date,
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    contentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContentHistory",
      },
    ],
  },
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
   }
);


// model creation
const User = mongoose.model("User", userSchema);

module.exports = User;
