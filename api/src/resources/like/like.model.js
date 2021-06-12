import mongoose from 'mongoose';

var likeSchema = new mongoose.Schema(
  {
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

export const Like =  mongoose.model('like', likeSchema);
