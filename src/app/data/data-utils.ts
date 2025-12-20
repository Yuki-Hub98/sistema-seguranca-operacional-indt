import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  create<T>(key: string, initialData: T[] = []) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData));
    }

    return {
      save(data: T[]) {
        localStorage.setItem(key, JSON.stringify(data));
      },
      load(): T[] {
        return JSON.parse(localStorage.getItem(key) || '[]');
      },
    };
  }
}
