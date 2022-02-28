import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Observer, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../formModels/LoginForm';
import { RegisterForm } from '../formModels/RegisterForm';
import { Freelance } from '../models/Freelance.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN_KEY = "jwt";
  private readonly USERNAME = "username";
  private readonly DISCRIMINATOR = "discriminator";
  private readonly NO_TOKEN: string = 'NO_TOKEN';

  private endpoint: string = '';

  private $loggedIn = new BehaviorSubject<boolean>(this.isLogged());
  private $username = new BehaviorSubject<string | null>(this.getUsername());
  private $user = new Subject<User>();
  private userbhv$ = new BehaviorSubject<User | null>(null);


  private $discriminatorBhv=new BehaviorSubject<string | null>(this.getDiscriminator());


  constructor(private http: HttpClient) {
    this.endpoint = environment.api_url;
  }


  login(form: LoginForm, observer?: Partial<Observer<User>> | undefined) {
    const obs = this.http.post<User>(`${this.endpoint}login`, form);
    obs.subscribe({
      next: value => {

        if (value != null) {

          this.$loggedIn.next(true);

          this.$user.next(value);
          this.userbhv$.next(value);
          this.$username.next(value.username);
          this.$discriminatorBhv.next(value.discriminator);
          sessionStorage.setItem(this.DISCRIMINATOR, value.discriminator)
          sessionStorage.setItem(this.USERNAME, value.username)
          sessionStorage.setItem(this.JWT_TOKEN_KEY, value.token ?? this.NO_TOKEN)

        }
        if (observer && observer.next)
          observer.next(value)
        
      },
      error: error => {
        if (observer && observer.error)
          observer.error(console.error())
      },
      complete: () => {
        if (observer && observer.complete)
          observer.complete()
      }
    })
  }

  signup(form: RegisterForm, observer?: Partial<Observer<User>> | undefined) {
    const obs = this.http.post<User>(`${this.endpoint}register`, form);
    obs.subscribe({
      next: value => {
        if (value != null) {
          this.$loggedIn.next(true);
          this.$user.next(value);

          this.$username.next(value.username);
          this.$discriminatorBhv.next(value.discriminator);
          sessionStorage.setItem(this.DISCRIMINATOR, value.discriminator)
          sessionStorage.setItem(this.USERNAME, value.username)
          sessionStorage.setItem(this.JWT_TOKEN_KEY, value.token ?? this.NO_TOKEN)
        }
        if (observer && observer.next)
          observer.next(value)
      },
      error: error => {
        if (observer && observer.error)
          observer.error(console.error())
      },
      complete: () => {
        if (observer && observer.complete)
          observer.complete()
      }
    })
  }

  isLoggedRequest() {
    return this.http.get<boolean>(`${this.endpoint}is-logged`, {
      headers: this.getAuthHeader()
    })
  }

  get userbhv() {
    return this.userbhv$.asObservable();
  }
  get username$() {
    return this.$username.asObservable();
  }
  get user$() {

    return this.$user.asObservable();
  }
  get isLoggedIn() {
    return this.$loggedIn.asObservable();
  }
  get discriminator$(){
    return this.$discriminatorBhv.asObservable();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.JWT_TOKEN_KEY);
  }

  isLogged(): boolean {
    return this.getToken() ? true : false;
  }

  logOut() {
    this.$loggedIn.next(false);
    this.$username.next(null);
    this.$user.next(undefined);
    this.userbhv$.next(null);
    this.$discriminatorBhv.next(null);
    // this.$user.next(undefined);
    sessionStorage.removeItem(this.DISCRIMINATOR);
    sessionStorage.removeItem(this.USERNAME);
    sessionStorage.removeItem(this.JWT_TOKEN_KEY);
  }

  getAuthHeader(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { "Authorization": token } : {}
  }

  getUsername() {
    return sessionStorage.getItem(this.USERNAME);
  }

  getDiscriminator() {
    return sessionStorage.getItem(this.DISCRIMINATOR);
  }








}
