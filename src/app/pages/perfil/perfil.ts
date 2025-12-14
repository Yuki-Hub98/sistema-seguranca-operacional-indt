import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-perfil',
  imports: [FaIconComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  readonly faUser = faUser;
}
