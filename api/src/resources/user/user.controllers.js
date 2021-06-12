import { User } from './user.model';

export function getUser(req, res) {
  res.status(200).json({ data: req.user });
}

export async function updateUser(req, res) {
  try {
    var user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

// TODO: Add like and cmt logic
