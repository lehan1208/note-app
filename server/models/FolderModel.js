import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
}, {timestamps: true});
// auto add createdAt and updatedAt fields

const FolderModel = mongoose.model("Folder", folderSchema);
export default FolderModel;