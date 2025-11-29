import React, { useEffect } from 'react';
import logo from '../assets/icons/Дом.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log('User updated in Header:', user); // Логируем user, чтобы проверить его обновление
  }, [user]); // Перерисовываем Header, если изменился user

  return (
    <header className='header'>
      <div className='header-top'>
        <Link to='/' className='header-logo'>
          <img src={logo} alt='Logo' width={50} height={50} />
        </Link>

        {/* Если пользователь авторизован, показываем его имя */}
        {user && <span className='user-name'>Привет, {user.name}</span>}
      </div>

      <nav className='header-menu'>
        <ul className='header-menu-list'>
          <li className='header-menu-item'>
            <Link to='/sell' className='header-menu-link'>
              Продать
            </Link>
          </li>
          <li className='header-menu-item'>
            <Link to='/rent' className='header-menu-link'>
              Арендовать
            </Link>
          </li>
          <li className='header-menu-item'>
            <Link to='/consultation' className='header-menu-link'>
              Онлайн консультация
            </Link>
          </li>
        </ul>
      </nav>

      <div className='header-action'>
        {/* Если пользователь не авторизован, показываем кнопки "Войти" и "Регистрация" */}
        {!user ? (
          <>
            <Link to='/login'>
              <button className='button-login'>Войти</button>
            </Link>
          </>
        ) : (
          // Если пользователь авторизован, показываем кнопку "Выйти"
          <button onClick={logout} className='button-logout'>
            Выйти
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
