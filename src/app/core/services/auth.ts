import { inject, Injectable, signal } from '@angular/core';
import { User, UserRole } from '../../models/user';
import { UserService } from './user-service';

const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);

  private checkUserAuthenticated(): User | null {
    const userStorage = sessionStorage.getItem(USER_KEY);
    return userStorage ? (JSON.parse(userStorage) as User) : null;
  }

  private _currentUser = signal<User | null>(this.checkUserAuthenticated());
  readonly currentUser = this._currentUser.asReadonly();

  thisAuthenticate = signal<boolean>(!!this._currentUser());

  autenticate(username: string, password: string): boolean {
    const user = this.userService.getUserByUserAndPassword(username, password);
    console.log('user found: ', user);
    if (user) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      this._currentUser.set(user);
      this.thisAuthenticate.set(true);
      return true;
    } else {
      this.thisAuthenticate.set(false);
      return false;
    }
  }

  setCurrentUser(user: User | null) {
    if (user) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      this._currentUser.set(user);
    }
  }
}
