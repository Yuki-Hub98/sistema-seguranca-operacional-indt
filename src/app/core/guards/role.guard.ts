import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { UserRole } from '../../models/user';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as UserRole | undefined;
  
  if (!allowedRoles) {
    router.navigate(['/']);
    return false;
  }

  const hasPermission = allowedRoles.includes(user.roles);

  if (!hasPermission) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
