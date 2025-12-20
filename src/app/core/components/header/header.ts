import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faBell, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { Sidebarservice } from '../../services/sidebarservice';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly faUser = faUser
  readonly faBell = faBell
  readonly faBars = faChartBar
  readonly faLogout = faArrowRightFromBracket

  private sideBarService = inject(Sidebarservice);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  toggleSidebar() {
    this.sideBarService.toggle();
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}