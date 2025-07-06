const express = require("express");
const {
  addPrompt,
  getPrompts,
  updatePrompt,
  deletePrompt,
  getByCategory,
} = require("../controller/PromptController");
const { validate } = require("../middleware/validate");
const { addPromptType, updatePromptType } = require("../type");
const { verifytoken } = require("../middleware/verifytoken");
const { requireRole } = require("../middleware/requireRole");

const routes = express.Router();

routes.post(
  "/add",
  verifytoken,
  requireRole(["admin"]),
  validate(addPromptType),
  addPrompt,
);
routes.get("/all", getPrompts);
routes.get("/:category", getByCategory);
routes.patch(
  "/:id",
  verifytoken,
  requireRole(["admin"]),
  validate(updatePromptType),
  updatePrompt,
);
routes.delete("/:id", verifytoken, requireRole(["admin"]), deletePrompt);

module.exports = routes;
