import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string | null = ''
  discriminator: string | null = ''

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.username$.subscribe(
      val => {
        this.username = val
        this._authService.discriminator$.subscribe(
          val => this.discriminator=val
        )
      }
    );

  }

}
