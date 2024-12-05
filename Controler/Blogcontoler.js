const BlogModel = require("../Model/BlogModel");
const multer = require("multer");
const path = require("path");



const All = async (req, res) => {
  try {
    let blogs = await BlogModel.find().populate('userId', 'name');

    res.status(200).send({ blogs });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const single = async (req, res) => {
  try {
    let id = req.params.id;
    let singleBlog = await BlogModel.findById({ _id: id }).populate('userId', 'name');;
    res.status(200).send({ msg: "single peoduct fech success", singleBlog });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const BlogAdd = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      content,
      userId,
      tags,
      category,
      status,
    } = req.body;

    if (!title || !description || !image || !userId) {
      return res
        .status(400)
        .send({ message: "All required fields must be provided." });
    }

    const blog = await BlogModel.create({
      title,
      description,
      image,
      content,
      userId,
      tags,
      category,
      status,
    });

    res.status(200).send({ message: "Blog added successfully", blog });
  } catch (error) {
    console.error("Error adding blog:", error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const GetMine = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ userId: req.body.userId }).populate(
      "userId",
      "username email"
    );

    if (!blogs || blogs.length === 0) {
      return res.status(404).send({ msg: "No blogs found for this user." });
    }

    res.status(200).send({ blogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching blogs." });
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.body; // Get the blog ID from the request body
    if (!id) {
      return res.status(400).send({ msg: "Blog ID is required." });
    }

    const result = await BlogModel.findOneAndDelete({
      _id: id,
      userId: req.body.userId,
    });

    if (!result) {
      return res
        .status(404)
        .send({ msg: "Blog not found or not authorized to delete." });
    }

    res.send({ msg: "Blog deleted successfully." });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send({
      msg: "An error occurred while deleting the blog.",
      error: error.message,
    });
  }
};

const EditGet = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).send({ msg: "Blog not found" });
    }

    res.send({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const EditBlog = async (req, res) => {
  try {
    const { id, title, description, image, content, tags, category, status } = req.body;

    if (!id || !title || !description) {
      return res
        .status(400)
        .send({ msg: "ID, title, and description are required" });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).send({ msg: "Blog not found" });
    }

    // Update fields
    blog.title = title.trim() || blog.title;
    blog.description = description.trim() || blog.description;
    blog.image = image?.trim() || blog.image;
    blog.content = content?.trim() || blog.content;
    blog.tags = tags || blog.tags;
    blog.category = category?.trim() || blog.category;
    blog.status = status || blog.status;

    await blog.save();

    res.status(200).send({ msg: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};



module.exports = {
  All,
  single,
  BlogAdd,
  GetMine,
  Delete,
  EditGet,
  EditBlog,
};
