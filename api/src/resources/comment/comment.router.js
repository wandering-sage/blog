import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth';
import { createOne, getAll, getMany, removeOne } from './comment.controllers';

const router = Router();

// /api/comment
router
  .route('/')
  .post(isAuthenticated, createOne)
  .get(isAuthenticated, getMany);

// /api/comment/:id
router
  .route('/:id')
  .delete(isAuthenticated, removeOne);

// /api/comment/:postid
router
  .route('/:postid')
  .get(getAll);

export default router;
