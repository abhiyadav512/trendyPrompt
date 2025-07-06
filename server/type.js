const zod = require("zod");

const registerUser = zod.object({
  name: zod.string().min(3, "name must be at least 3 characters"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const loginUser = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const addPromptType = zod.object({
  title: zod.string().min(1, "Title is required"),
  description: zod.string().min(1, "Description is required"),
  category: zod.enum(
    [
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
    {
      required_error: "Category is required",
      invalid_type_error: "Invalid category selected",
    },
  ),
  promptText: zod.string().min(1, "Prompt text is required"),
  imgUrl: zod.string().url("Invalid URL for image"),
});

const updatePromptType = zod.object({
  title: zod.string().min(1, "Title is required").optional(),
  description: zod.string().min(1, "Description is required").optional(),
  promptText: zod.string().min(1, "Prompt text is required").optional(),
  category: zod
    .enum(
      [
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
      {
        required_error: "Category is required",
        invalid_type_error: "Invalid category selected",
      },
    )
    .optional(),
  imgUrl: zod.string().url("Invalid URL for image").optional(),
});

module.exports = {
  registerUser,
  loginUser,
  addPromptType,
  updatePromptType,
};
