import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../core/components/header/header';
import { Navbar } from '../../core/components/navbar/navbar';
import { Sidebarservice } from '../../core/services/sidebarservice';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Navbar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  sidebar = inject(Sidebarservice);

  isOpen = this.sidebar.isOpen;

}
