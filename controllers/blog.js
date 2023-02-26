const Blog = require("../models/blog");
const Comment = require("../models/comment");

function addNew(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}

async function createComment(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}

async function createBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}

async function getBlogPageById(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
}

module.exports = {
  addNew,
  createComment,
  createBlog,
  getBlogPageById,
};
