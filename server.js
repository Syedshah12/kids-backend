const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/auth");

// Allow only Vercel frontend to access the backend
app.use(
  cors({
    origin: 'https://kids-learning-iota.vercel.app',
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api", authRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("MongoDB connection failed:", err.message);
});
