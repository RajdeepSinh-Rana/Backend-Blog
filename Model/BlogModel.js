const mongoose=require("mongoose")

const BlogSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  content: String,
  createdTime: { type: Date, default: Date.now },
  updatedTime: { type: Date, default: Date.now },
  author: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  category: String
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;