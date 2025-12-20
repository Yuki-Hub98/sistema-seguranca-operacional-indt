import { FormControl } from '@angular/forms';

export interface User {
  id: number;
  username: string;
  email?: string;
  password: string;
  firstName: string;
  lastName?: string;
  roles: UserRole;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  OPERADOR = 'OPERADOR',
  SUPERVISOR = 'SUPERVISOR',
  VISITANTE = 'VISITANTE',
  GESTOR = 'GESTOR',
}

export interface UserFormGroup {
  username: FormControl<string | undefined | null>;
  email: FormControl<string | undefined | null>;
  newPassword: FormControl<string | undefined | null>;
  confirmPassword: FormControl<string | undefined | null>;
  firstName: FormControl<string | undefined | null>;
  lastName: FormControl<string | undefined | null>;
  roles: FormControl<UserRole | undefined | null>;
  isActive: FormControl<boolean | undefined | null>;
}
