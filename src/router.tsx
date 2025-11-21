import { createBrowserRouter } from 'react-router-dom';
import { Home, About, NotFound, LoginLayout } from "./pages"
import { AppLayout } from "./layout/AppLayout"

export const router = createBrowserRouter([
  
  {
    path: '/login',
    element: <LoginLayout />,
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
