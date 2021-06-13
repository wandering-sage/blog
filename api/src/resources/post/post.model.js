import mongoose from 'mongoose';

var postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Post =  mongoose.model('post', postSchema);
