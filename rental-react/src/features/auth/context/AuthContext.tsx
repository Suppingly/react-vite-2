import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Определяем тип данных пользователя
interface User {
  id: number;
  name: string;
  email: string;
}

// Тип для контекста аутентификации
interface AuthContextType {
  user: User | null; // Текущий пользователь или null, если не авторизован
  loading: boolean; // Состояние загрузки
  error: string | null; // Ошибка, если она возникла
  login: (email: string, password: string) => Promise<User | void>; // Функция для входа
  register: (name: string, email: string, password: string) => Promise<User | void>; // Функция для регистрации
  logout: () => Promise<void>; // Функция для выхода
}

// Создаём контекст для аутентификации с типом AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:4200/api/auth'; // URL для API аутентификации

// Компонент-обертка, который предоставляет данные и методы аутентификации
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Стейт для данных пользователя
  const [loading, setLoading] = useState<boolean>(true); // Стейт для загрузки
  const [error, setError] = useState<string | null>(null); // Стейт для ошибки

  // Функция для чтения куки
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  // Получаем данные пользователя при загрузке страницы через куки
  useEffect(() => {
    const token = getCookie('token'); // Читаем токен из куки

    if (token) {
      // Если токен есть, запрашиваем данные пользователя с сервера
      const getUserData = async () => {
        try {
          const res = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            credentials: 'include', // Включаем куки в запрос
          });

          if (res.ok) {
            const data: User = await res.json();
            setUser(data); // Устанавливаем данные пользователя в стейт
          } else {
            setUser(null); // Если нет данных, очищаем пользователя
          }
        } catch (err) {
          setError('Ошибка при получении данных пользователя'); // Обрабатываем ошибку
        } finally {
          setLoading(false); // Завершаем загрузку
        }
      };

      getUserData();
    } else {
      setUser(null); // Если токена нет, очищаем состояние
      setLoading(false); // Завершаем загрузку
    }
  }, []); // Пустой массив зависимостей — эффект сработает только один раз при монтировании компонента

  // Регистрация пользователя
  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null); // Сбрасываем ошибку

      // Отправляем запрос на регистрацию
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        credentials: 'include', // Включаем куки в запрос
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error('Ошибка регистрации'); // Если ошибка, выбрасываем исключение

      // Запрашиваем профиль пользователя после успешной регистрации
      const profileRes = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        credentials: 'include', // Включаем куки в запрос
      });

      if (profileRes.ok) {
        const userData: User = await profileRes.json();
        setUser(userData); // Устанавливаем данные о пользователе
        console.log('После регистрации:', userData);
        return userData;
      } else {
        const data = await res.json();
        setUser(data); // Заполняем данные из ответа регистрации, если нет профиля
        return data;
      }
    } catch (err: any) {
      setError(err.message); // Устанавливаем ошибку, если она произошла
      throw err; // Бросаем ошибку дальше
    }
  };

  // Вход пользователя
  const login = async (email: string, password: string) => {
    try {
      setError(null); // Сбрасываем ошибку

      // Отправляем запрос на вход
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include', // Включаем куки в запрос
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Неверный email или пароль'); // Если ошибка, выбрасываем исключение

      // Запрашиваем профиль пользователя после успешного входа
      const profileRes = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        credentials: 'include', // Включаем куки в запрос
      });

      if (profileRes.ok) {
        const userData: User = await profileRes.json();
        setUser(userData); // Сохраняем данные о пользователе
        console.log('Данные после логина:', userData);
        return userData;
      } else {
        throw new Error('Не удалось получить данные пользователя');
      }
    } catch (err: any) {
      setError(err.message); // Устанавливаем ошибку, если она произошла
      throw err; // Бросаем ошибку дальше
    }
  };

  // Выход пользователя
  const logout = async () => {
    // Отправляем запрос на выход
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include', // Включаем куки в запрос
    });

    setUser(null); // Очищаем данные о пользователе
    document.cookie = 'token=; Max-Age=0'; // Удаляем куку с токеном
  };

  // Возвращаем контекст с данными о пользователе, функциями и состоянием
  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для получения контекста аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext); // Используем контекст

  // Если хук используется вне AuthProvider, выбрасываем ошибку
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Возвращаем контекст
};
