import React from 'react';
import { Route,Routes } from 'react-router-dom';

import HomesPage from '../features/homes/pages/HomePage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomesPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    );
};

export default AppRoutes;
