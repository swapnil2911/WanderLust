import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, default: "https://p.kindpng.com/picc/s/685-6851196_person-icon-grey-hd-png-download.png"},
  aboutMe: { type: String, default: "Hey There!! Welcome to my blog page" },
  id: { type: String },
});

export default mongoose.model("User", userSchema);