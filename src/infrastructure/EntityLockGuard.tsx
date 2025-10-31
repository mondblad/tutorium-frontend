import type { ReactNode } from 'react';

interface Props {
  config?: unknown;
  children: ReactNode;
}

export const EntityLockGuard: React.FC<Props> = ({ children }) => {
  // Тут позже можно добавить проверку блокировки
  return <>{children}</>;
};