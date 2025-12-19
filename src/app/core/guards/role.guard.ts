import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { UserRole } from '../../models/user';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as UserRole | undefined;
  
  if (allowedRoles === undefined) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
