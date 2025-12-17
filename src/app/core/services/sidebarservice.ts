import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sidebarservice {

    isOpen = signal<boolean>(true);

    toggle() {
      this.isOpen.update(v => !v);
    }
  
}
