import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../../models/user';

const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private users: User[] = [
    {id: 1, username: 'admin', password: '1234', email:'admin@email.com', firstName: 'Admin', roles: UserRole.ADMIN, isActive: true},
  ]

  private checkUserAuthenticated(): User | null {
    const userStorage = sessionStorage.getItem(USER_KEY);
    return userStorage ? JSON.parse(userStorage) as User : null;
  }

  private _currentUser = signal< User | null>(this.checkUserAuthenticated());
  readonly currentUser = this._currentUser.asReadonly();

  thisAuthenticate = signal<boolean>(!!this._currentUser());

  autenticate(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    console.log('user found: ', user);
    if (user) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      this._currentUser.set(user);
      this.thisAuthenticate.set(true);
      return true;
    }else {
      this.thisAuthenticate.set(false);
      return false;
    }
  }

}