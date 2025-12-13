import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faBell, faChartBar } from '@fortawesome/free-regular-svg-icons';

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
}