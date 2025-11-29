import React, { useState } from 'react'; // Импортируем React и хук useState
import LoginForm from './LoginForm'; // Импортируем компонент формы авторизации
import RegisterForm from './RegisterForm'; // Импортируем компонент формы регистрации

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Стейт для переключения между формой авторизации и регистрации. Начально показываем форму авторизации

  // Функция для переключения между формами
  const toggleForm = () => setIsLogin((prev) => !prev); // Меняем состояние на противоположное (если был логин, станет регистрация и наоборот)

  return (
    <div auth-container>
      {' '}
      {/* Контейнер для формы авторизации/регистрации */}
      <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>{' '}
      {/* Заголовок зависит от состояния isLogin */}
      {/* В зависимости от состояния isLogin отображаем либо форму для логина, либо форму для регистрации */}
      {isLogin ? <LoginForm /> : <RegisterForm />}
      {/* Кнопка для переключения между формами. Текст кнопки меняется в зависимости от текущего состояния формы */}
      <button onClick={toggleForm} className='toggle-button'>
        {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
      </button>
    </div>
  );
};

export default AuthForm;
