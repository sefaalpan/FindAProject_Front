import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string = '';

  constructor(private http: HttpClient, private _authService : AuthService) {
    this.endpoint = environment.api_url + 'users';
  }

  getByUsername() {
    let username = this._authService.getUsername();
    return this.http.get<User>(`${this.endpoint}/username?username=${username}`, {
      headers: this._authService.getAuthHeader()
    });
  }
}
