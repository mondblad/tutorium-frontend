import type { ReactNode } from 'react';
import type { LoaderFunction } from 'react-router-dom';

export type Permission = { subject: string; action: string[] };

export interface LockConfig {
    locked: boolean;
    reason?: string;
}

export interface IRouterConfig {
  name: string;                  // уникальное имя маршрута
  parent: string | null;         // parent route name
  path: string;                  // путь (частичный или полный)
  element: ReactNode;            // компонент
  children?: IRouterConfig[];    // дочерние маршруты
  permissions?: Permission[];    // права доступа
  lock?: LockConfig;             // конфиг блокировки
  loader?: LoaderFunction;       // React Router loader
  errorElement?: ReactNode;      // React Router error boundary
}
