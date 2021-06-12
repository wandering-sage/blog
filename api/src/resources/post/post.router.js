import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../../utils/auth';
import controllers from './post.controllers';

const router = Router();

// /api/post
router
  .route('/')
  .get(controllers.getMany)
  .post(isAuthenticated, isAdmin, controllers.createOne);

// /api/post/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(isAuthenticated, isAdmin, controllers.updateOne)
  .delete(isAuthenticated, isAdmin, controllers.removeOne);

export default router;
