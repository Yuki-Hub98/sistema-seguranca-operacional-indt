import { inject, Injectable, OnInit, signal } from '@angular/core';
import { User } from '../../models/user';
import usersJson from '../../data/users.json';
import { LocalStorageService } from '../../data/data-utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly STORAGE_KEY = 'users-storage';
  private localStorageService = inject(LocalStorageService);
  private userStorage = this.localStorageService.create<User>(
    this.STORAGE_KEY,
    usersJson as User[]
  );
  private usersSignal = signal<User[]>(this.userStorage.load());

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

  updateUser(updatedUser: User): void {
    const users = this.usersSignal();
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      this.usersSignal.set(users);
      this.userStorage.save(users);
    }
  }

  deleteUser(id: number): void {
    const users = this.usersSignal();
    const updatedUsers = users.filter((user) => user.id !== id);
    this.usersSignal.set(updatedUsers);
    this.userStorage.save(updatedUsers);
  }
}
