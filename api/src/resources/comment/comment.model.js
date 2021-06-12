import mongoose from 'mongoose';

var commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'post',
      required: true
    }
  },
  { timestamps: true }
);

export const Comment =  mongoose.model('comment', commentSchema);
