import { Router } from 'express';
import { AuthController } from '../features/auth/auth-controller.js';

const router = Router();

// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/login
router.post('/login', AuthController.login);

// POST /api/auth/refresh
router.post('/refresh', AuthController.refresh);

// GET /api/auth/google (명세서의 /auth/google)
router.get('/google', AuthController.googleLogin);

// GET /api/auth/google/callback
router.get('/google/callback', AuthController.googleCallback);

export default router;
