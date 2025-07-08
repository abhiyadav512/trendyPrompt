const Prompt = require("../models/PromptModel");

const addPrompt = async (req, res) => {
  try {
    const { title, description, promptText, imgUrl, category } = req.body;

    if (!title || !description || !promptText || !imgUrl || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPrompt = new Prompt({
      title,
      description,
      promptText,
      imgUrl,
      category,
    });
    await newPrompt.save();

    res
      .status(201)
      .json({ message: "Prompt created successfully", prompt: newPrompt });
  } catch (error) {
    // console.error("Add Prompt error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPrompts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await Prompt.countDocuments();

    const prompts = await Prompt.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    // console.error("Get Prompts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getPromptById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const prompt = await Prompt.findById(id);

//     if (!prompt) {
//       return res.status(404).json({ message: "Prompt not found" });
//     }

//     res.status(200).json(prompt);
//   } catch (error) {
//     console.error("Get Prompt By ID error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const updatePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, promptText, imgUrl, category } = req.body;

    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    if (title) prompt.title = title;
    if (description) prompt.description = description;
    if (promptText) prompt.promptText = promptText;
    if (imgUrl) prompt.imgUrl = imgUrl;
    if (category) prompt.category = category;

    await prompt.save();

    res.status(200).json({ message: "Prompt updated successfully", prompt });
  } catch (error) {
    // console.error("Update Prompt error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findByIdAndDelete(id);

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.status(200).json({ message: "Prompt deleted successfully" });
  } catch (error) {
    // console.error("Delete Prompt error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const query = {
      category: { $regex: new RegExp(`^${category.trim()}$`, "i") },
    };

    const total = await Prompt.countDocuments(query);

    const prompts = await Prompt.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  addPrompt,
  getPrompts,
  //   getPromptById,
  updatePrompt,
  deletePrompt,
  getByCategory,
};
