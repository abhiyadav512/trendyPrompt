const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongodb = require("./db");
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

const UserRoutes = require("./routes/UserRoutes");
const PromptRoutes = require("./routes/PromptRoutes");

app.use("/api/user/auth/", UserRoutes);
app.use("/api/prompt/", PromptRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
