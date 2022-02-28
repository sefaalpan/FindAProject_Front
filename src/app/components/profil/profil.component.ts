import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Freelance } from 'src/app/core/models/Freelance.model';
import { Projet } from 'src/app/core/models/Projet.model';
import { User } from 'src/app/core/models/User.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { FreelanceService } from 'src/app/core/services/freelance.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  afficher = false


  user !: User;
  freelance !: Freelance

  user$ !: Observable<User>;
  connectedUser$ !: Observable<User>;

  projets: Projet[] = [];

  constructor(private _userservice: UserService,
    private _authService: AuthService,
    private _freelanceService: FreelanceService,
    private router: Router,
    private _projectService: ProjetService) { }

  ngOnInit(): void {



    if (this._authService.getDiscriminator() === "FREELANCE") {
      this._freelanceService.getByUsername().subscribe(
        {
          next: (user: Freelance) => {
            this.freelance = user;
            this._projectService.getProjetsByUsername().subscribe(
              val => {
                this.projets = val
                user.projets?.forEach(p =>
                  this.projets.push(p))
              }
            )
          }
          ,
          error: err => console.log(err),
          complete: () => console.log("completed")
        }
      )
    }
    else {

      this._userservice.getByUsername().subscribe(
        {
          next: (user: User) => {
            this.user = user as User
            this._projectService.getProjetsByUsername().subscribe(
              val => this.projets = val
            )
          }
          ,
          error: err => console.log(err),
          complete: () => {}
        }
      )
    }


  }

  mesProjets() {

    // this.router.navigate(['projets', this.freelance.username])
  }

}
