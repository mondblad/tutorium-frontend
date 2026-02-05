import { createBrowserRouter } from 'react-router-dom';
import { Home, About, NotFound, LoginLayout, BoardPage } from "./pages"
import { AppLayout } from "./layout/AppLayout"
import { OAuthCallback } from './modules/auth/components/OAuthCallback/OAuthCallback';
import { LoginComponent } from './modules/auth/components/LoginForm/LoginForm';
import { RegistrationForm } from './modules/auth/components/RegistrationForm/RegistrationForm';

export const router = createBrowserRouter([
  {
    path: '/oauth/callback',
    element: <OAuthCallback />,
  },
  {
    element: <LoginLayout />,
    children: [
      {
        path: '/login',
        element: <LoginComponent />
      },
      {
        path: '/registr',
        element: <RegistrationForm />
      }
    ]
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  //Board
  {
    path: '/board',
    element: <BoardPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
