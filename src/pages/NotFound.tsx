import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center'
    }}>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>К сожалению, такой страницы не существует.</p>
      <Link to="/" style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#1890ff',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Вернуться на главную
      </Link>
    </div>
  );
};