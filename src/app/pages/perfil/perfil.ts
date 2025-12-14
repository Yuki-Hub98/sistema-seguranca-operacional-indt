import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faUser, faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-perfil',
  imports: [FaIconComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  readonly faUser = faUser;
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faIdBadge = faIdBadge
}
