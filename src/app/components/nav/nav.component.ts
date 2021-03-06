import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  username: string | null = null;
  isLoggedIn$ !: Observable<boolean>;
  discriminator: string | null = '';

  constructor(private _service: AuthService, private router: Router, private titleService : Title) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this._service.isLoggedIn

    this._service.username$.subscribe(
      val => {
        this.username = val
        this._service.discriminator$.subscribe(
          val => this.discriminator = val
        )
        this.discriminator = this._service.getDiscriminator();
      }
    )
  }

  logout() {
    this._service.logOut();
    this.router.navigate(['connexion'])
  }

  setTitle(newTitle:string){
    newTitle = newTitle.charAt(0).toUpperCase() + newTitle.substring(1, newTitle.length);     
    this.titleService.setTitle(newTitle);
    
  }
  
}
