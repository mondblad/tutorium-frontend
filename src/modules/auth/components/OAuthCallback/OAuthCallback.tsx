import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Сохраняем токен, например в localStorage
            localStorage.setItem('jwt', token);

            // Редиректим на домашнюю страницу
            navigate('/home');
        } else {
            // Если токена нет, редирект на страницу логина
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return <div>Обрабатываем авторизацию...</div>;
};
