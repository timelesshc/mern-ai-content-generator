require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const usersRouter = require("./routes/usersRouter");
const cron = require("node-cron");
const cors = require("cors");
require("./utils/connectDB")();
const { errorHandler } = require("./middlewares/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// cron for the trial period: run every day
cron.schedule("0 0 * * *", async () => {
  try {
    // get the current date
    const currentDate = new Date();
    await User.updateMany(
      {
        trialActive: true,
        trialExpires: { $lt: currentDate },
      },
      {
        $set: {
          trialActive: false,
          subscriptionPlan: "Free",
          monthlyRequestCount: 5,
        },
      }
    );
  } catch (error) {
    console.error("Error updating users:", error);
  }
});

// cron for the free plan: run at the end of every month
cron.schedule("0 0 1 * *", async () => {
  try {
    // get the current date
    const currentDate = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Free",
        nextBillingDate: { $lt: currentDate },
      },
      {
        $set: {
          monthlyRequestCount: 0,
        },
      }
    );
  } catch (error) {
    console.error("Error updating users:", error);
  }
});

// cron for the basic plan: run at the end of every month
cron.schedule("0 0 1 * *", async () => {
  try {
    // get the current date
    const currentDate = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Basic",
        nextBillingDate: { $lt: currentDate },
      },
      {
        $set: {
          monthlyRequestCount: 0,
        },
      }
    );
  } catch (error) {
    console.error("Error updating users:", error);
  }
});

// cron for the premium plan: run at the end of every month
cron.schedule("0 0 1 * *", async () => {
  try {
    // get the current date
    const currentDate = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Premium",
        nextBillingDate: { $lt: currentDate },
      },
      {
        $set: {
          monthlyRequestCount: 0,
        },
      }
    );
  } catch (error) {
    console.error("Error updating users:", error);
  }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

// Error Handling Middleware
app.use(errorHandler);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
