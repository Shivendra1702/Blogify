require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const {connectDB} = require("./connection");
const Blog = require("./models/blog");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const PORT = process.env.PORT || 8000;
const app = express();
connectDB(process.env.MONGO_URL);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("homepage", {
    user: req.user,
    allBlogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, (err) => {
  console.log(`Server started Successfully at PORT :${PORT}`);
});
