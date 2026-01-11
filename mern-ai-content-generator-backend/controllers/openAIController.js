const asyncHandler = require("express-async-handler");
const axios = require("axios");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

// OpenAI Controller
const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].text.trim();
    // create the history
    const newContent = await ContentHistory.create({
      user: req.user._id,
      content,
    });
    // push the content into the user
    const userFound = await User.findById(req.user._id);
    userFound.contentHistory.push(newContent._id);
    // increment api request count
    userFound.apiRequestCount += 1;
    await userFound.save();
    res.status(200).json({ content });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { openAIController };
