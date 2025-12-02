import bcrypt from 'bcrypt';
import JWT from '../utils/jwt.js';
import { prisma } from '../app.js';

class AuthService {
  // Регистрация нового пользователя
  async register({ email, password, name }) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }

  // Логин пользователя и создание токена
  async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid password');

    // Генерация JWT токена
    const token = JWT.signToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return token; // Возвращаем токен для использования в куках
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) throw new Error('User not found');
    return user;
  }
}
export default AuthService;
