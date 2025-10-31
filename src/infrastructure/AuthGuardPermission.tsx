import type { ReactNode } from 'react';
import type { Permission } from './types';

interface Props {
  subject: Permission[];
  children: ReactNode;
}

export const AuthGuardPermission: React.FC<Props> = ({ children }) => {
  // Тут позже можно добавить реальную проверку прав
  return <>{children}</>;
};