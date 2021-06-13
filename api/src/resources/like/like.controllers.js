import sendError from '../../utils/error';
import { Like } from './like.model';

export async function createOne(req, res) {
  const createdBy = req.user._id;
  try {
    var doc = await Like.create({ ...req.body, createdBy });
    return res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    return sendError(res);
  }
}

export async function getAll(req, res) {
  const postid = req.params.postid;
  try {
    const docs = await Like.find({ post: postid }).lean().populate("createdBy", "name").exec();
    return res.status(201).json({ data: docs });
  } catch (e) {
    console.error(e);
    return sendError(res);
  }
}

export async function removeOne(req, res) {
  var id = req.params.id;
  var doc = await Like.findById(id).exec();
  if (!doc) {
    return sendError(res, 'Not found in DB', 404);
  }
  if (String(doc.createdBy) == String(req.user._id)) {
    await Like.deleteOne({ _id: id });
    return res.status(200).json({ data: doc });
  }
  return sendError(res, 'Not Authorized', 401);
}

export async function getMany(req, res) {
  try {
    const docs = await Like.find({ createdBy: req.user._id }).lean().exec();
    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    return sendError(res);
  }
}
