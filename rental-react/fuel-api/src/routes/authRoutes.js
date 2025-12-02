import express from 'express';
import AuthController from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../middlewares/validate.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', registerValidator, (req, res, next) =>
  authController.register(req, res, next),
);
router.post('/login', loginValidator, (req, res, next) => authController.login(req, res, next));
router.get('/profile', (req, res, next) => authController.getProfile(req, res, next));
router.post('/logout', (req, res, next) => authController.logout(req, res, next));

export default router;
