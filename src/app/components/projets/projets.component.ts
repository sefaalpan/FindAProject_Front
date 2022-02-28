import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/core/models/Categorie.model';
import { Projet } from 'src/app/core/models/Projet.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjetService } from 'src/app/core/services/projet.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {

  projets: Projet[] = [];
  categorie !: Categorie;
  title = 'Liste de tous les projets'
  cat_id !: number;
  titreAsc: boolean = false;
  dateAsc: boolean = false;
  catAsc: boolean = false;
  clicked: boolean = false;

  $loggedin !: Observable<boolean>

  constructor(private _service: ProjetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _authService: AuthService) { }

  ngOnInit(): void {


    this.$loggedin = this._authService.isLoggedIn;

    this.cat_id = this.activatedRoute.snapshot.params['cat_id'] as number;

    if (this.cat_id) {
      this._service.getAllByCategorie(this.cat_id).subscribe(data => {
        this.projets = data;
        if (this.projets.length > 0) {
          this.categorie = this.projets[0].categorie;
        }
      })
    }
    else {
      this._service.getAll().subscribe(data => {
        this.projets = data
        console.log(data);
      })
    }
  }

  goToProjet(id: number) {
    this.router.navigate(['projet', id]);
  }

  byTitre() {
    if (this.titreAsc) {
      let sub = this._service.getProjetsSortedAsc().subscribe(
        {
          next: data => this.projets = data,
          error: err => console.log(err),
          complete: () => {
            sub.unsubscribe();
          }
        }
      )
    }
    else {
      let sub = this._service.getProjetsSortedDesc().subscribe(
        {
          next: data => this.projets = data,
          error: err => console.log(err),
          complete: () => {
            sub.unsubscribe();
          }
        }
      )
    }
  }
  byDate() {
    if (this.cat_id) {
      console.log(this.cat_id);
      
      this.byCategorie();
    }
    else {

      if (this.dateAsc) {
        let sub = this._service.getProjetsByDateAsc().subscribe(
          {
            next: data => this.projets = data,
            error: err => console.log(err),
            complete: () => {
              sub.unsubscribe();
            }
          }
        )
      }
      else {
        let sub = this._service.getProjetsByDateDesc().subscribe(
          {
            next: data => this.projets = data,
            error: err => console.log(err),
            complete: () => {
              sub.unsubscribe();
            }
          }
        )
      }

    }
  }
  byCategorie() {
    if (this.catAsc) {
      let sub = this._service.getProjetsByCatOrderByDateAsc(this.cat_id).subscribe(
        {
          next: data => this.projets = data,
          error: err => console.log(err),
          complete: () => {
            sub.unsubscribe();
          }
        }
      )
    }
    else {
      let sub = this._service.getProjetsByCatOrderByDateDesc(this.cat_id).subscribe(
        {
          next: data => this.projets = data,
          error: err => console.log(err),
          complete: () => {
            sub.unsubscribe();
          }
        }
      )
    }
  }

  byDisponibilite() {
    if (this.cat_id) {
      let sub = this._service.getProjetsByCatIdAndReserveFalse(this.cat_id).subscribe(
        {
          next: data => this.projets = data,
          error: err => console.log(err),
          complete: () => {
            sub.unsubscribe();
          }
        }
      )
    }
    else {

      let sub = this._service.getProjetsByReserveFalse().subscribe(
        {
          next: data => this.projets = data,
          error: err => console.log(err),
          complete: () => {
            sub.unsubscribe();
          }
        }
      )

    }
  }


}

