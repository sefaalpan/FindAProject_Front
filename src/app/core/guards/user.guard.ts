import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private _service: AuthService, private router: Router) { }

  canActivate() {
    let acces = this._service.getToken() != null;

    if (!acces) {
      this.router.navigate(['connexion'])
    }
    return acces;
  }

}
