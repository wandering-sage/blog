import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { check } from 'express-validator';
import { connect } from './utils/db';
import config from './config';
import { signin, signup } from './utils/auth';
import userRouter from './resources/user/user.router';
import postRouter from './resources/post/post.router';
import commentRouter from './resources/comment/comment.router';
import likeRouter from './resources/like/like.router';

export const app = express();

// To remove this from header(added by express)
app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// -------------------------------------------API routes------------------------------------------------------
app.post(
  '/api/signup',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'password should be at least 5 char').isLength({
      min: 5,
    }),
  ],
  signup
);
app.post(
  '/api/signin',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'password field is required').isLength({ min: 1 }),
  ],
  signin
);

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/like', likeRouter);

// To start the server
export async function start() {
  try {
    // connects to db
    await connect();

    app.listen(config.port, () => {
      console.log(`Running at http://localhost:${config.port}/`);
    });
  } catch (e) {
    console.error(e);
  }
}
