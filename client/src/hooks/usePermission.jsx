// src/hooks/usePermission.js
import { useMemo } from 'react';

export default function usePermission() {
  const permissions = JSON.parse(sessionStorage.getItem('permissions') || '[]');

  const can = useMemo(() => {
    return (perm) => permissions.includes(perm);
  }, [permissions]);

  return { permissions, can };
}
