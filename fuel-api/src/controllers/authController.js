import AuthService from '../services/authService.js';
import JWT from '../utils/jwt.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  // Регистрация
  async register(req, res, next) {
    try {
      const user = await this.authService.register(req.body);
      
      // После регистрации автоматически логиним пользователя
      const token = await this.authService.login(req.body);
      
      // Устанавливаем токен в куку
      res.cookie('token', token, {
        httpOnly: true,  // Кука доступна только серверу
        secure: process.env.NODE_ENV === 'production', // Для HTTPS в проде
        sameSite: 'Lax',  // Lax для работы с localhost (Strict может блокировать куки)
        maxAge: 3600000, // Кука будет жить 1 час
        path: '/', // Путь для куки
      });
      
      res.status(201).json(user); // Возвращаем пользователя
    } catch (error) {
      next(error);
    }
  }

  // Логин
  async login(req, res, next) {
    try {
      const token = await this.authService.login(req.body);
      
      // Устанавливаем токен в куку
      res.cookie('token', token, {
        httpOnly: true,  // Кука доступна только серверу
        secure: process.env.NODE_ENV === 'production', // Для HTTPS в проде
        sameSite: 'Lax',  // Lax для работы с localhost (Strict может блокировать куки)
        maxAge: 3600000, // Кука будет жить 1 час
        path: '/', // Путь для куки
      });

      res.status(200).json({ message: 'Вход успешен' });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const token = req.cookies.token;
      
      // Если токена нет, возвращаем ошибку
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const decoded = JWT.verifyToken(token);  // Декодируем токен для получения данных пользователя
      const user = await this.authService.getUserById(decoded.id);  // Получаем пользователя по ID из токена

      res.status(200).json(user);  // Отправляем данные пользователя
    } catch (error) {
      next(error);
    }
  }

  // logout
  async logout(req, res, next) {
    try {
      // Удаляем куку с токеном (используем те же настройки, что и при установке)
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
      });
      res.status(200).json({ message: 'Выход выполнен' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
