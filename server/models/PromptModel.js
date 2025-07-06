const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Movie & Fantasy",
        "Adventure & Travel",
        "Art",
        "Sci-Fi",
        "Horror",
        "Romance",
        "Fashion",
        "Studio",
        "Culture",
      ],
    },
    promptText: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Prompt = mongoose.model("Prompt", PromptSchema);

module.exports = Prompt;
