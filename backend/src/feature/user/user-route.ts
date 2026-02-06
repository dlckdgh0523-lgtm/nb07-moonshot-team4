import { Router } from 'express';
import { authenticate } from './user-middleware';
import { getMyInfo, updateMyInfo} from './user.controller';

const router = Router();

router.get('/me', authenticate, getMyInfo);
router.patch('/me', authenticate, updateMyInfo);

export default router;