const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const { addNew, createComment, createBlog ,getBlogPageById} = require("../controllers/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", addNew);

router.get("/:id", getBlogPageById);

router.post("/", upload.single("coverImage"), createBlog);

router.post("/comment/:blogId", createComment);

module.exports = router;
