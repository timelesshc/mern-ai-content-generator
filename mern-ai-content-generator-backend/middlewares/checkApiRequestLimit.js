const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // find the user
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    let requestLimit = 0;
    // check if trial period is still valid
    if (user.trialActive) {
        requestLimit = user.monthlyRequestCount;
    }
    // check if the user has exceeded the request limit
    if (user.apiRequestCount >= requestLimit) {
        throw new Error("API request limit exceeded. Please upgrade your subscription.");
    }
    next();
});

module.exports = checkApiRequestLimit;
    
