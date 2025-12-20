import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSignal = signal<User[]>([
    {
      id: 1,
      username: 'admin',
      password: '1234admin',
      email: 'admin@email.com',
      firstName: 'Admin',
      roles: UserRole.ADMIN,
      isActive: true,
    },
    {
      id: 2,
      username: 'supervisor',
      password: '1234supervisor',
      email: 'supervisor@email.com',
      firstName: 'Supervisor',
      roles: UserRole.SUPERVISOR,
      isActive: true,
    },
    {
      id: 3,
      username: 'operador',
      password: '1234operador',
      email: 'operador@email.com',
      firstName: 'Operador',
      roles: UserRole.OPERADOR,
      isActive: true,
    },
  ]);

  getUsers(): User[] {
    return this.usersSignal.asReadonly()();
  }

  getUserByUserAndPassword(username: string, password: string): User | undefined {
    return this.usersSignal().find(
      (user) => user.username === username && user.password === password
    );
  }

  getUserById(id: number): User | undefined {
    return this.usersSignal().find((user) => user.id == id);
  }
}
