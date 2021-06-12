import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth';
import { getUser, updateUser } from './user.controllers';

const router = Router();

router.use(isAuthenticated);

router.get('/', getUser);
router.put('/', updateUser);

export default router;
