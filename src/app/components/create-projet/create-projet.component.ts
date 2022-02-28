import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetForm } from 'src/app/core/formModels/ProjetForm';
import { Categorie } from 'src/app/core/models/Categorie.model';
import { FieldErrors } from 'src/app/core/models/FieldErrors.model';
import { Projet } from 'src/app/core/models/Projet.model';
import { ValidErrors } from 'src/app/core/models/ValidationErrors.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { ProjetService } from 'src/app/core/services/projet.service';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.scss']
})
export class CreateProjetComponent implements OnInit {

  form = new FormGroup({});
  categories: Categorie[] = [];
  username: string = '';
  currentDate = new Date();
  validErrors !: ValidErrors;

  constructor(private _catService: CategorieService,
    private fb: FormBuilder,
    private _authServ: AuthService,
    private _projetService: ProjetService,
    private router: Router) {
    this.form = this.fb.group({
      titre: new FormControl('', Validators.required),
      resume: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    if (!this._authServ.isLogged())
      this.router.navigate(['connexion'])
    else {
      this._catService.getAll().subscribe(data => this.categories = data);
      this.username = this._authServ.getUsername() as string;
    }

  }

  submit() {

    let projetForm = this.form.value as ProjetForm
    projetForm.userSimpleForm = { username: this.username as string }
    projetForm.categorie = { label: this.form.value.categorie }
    projetForm.date = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    let projet: Projet;

    this._projetService.insert(projetForm).subscribe(
      {
        next: (val: Projet) => {
          projet = val as Projet
        },
        error: err => {
          this.validErrors = err.error as ValidErrors;
        },
        complete: () => {
          this.form.reset();
          this.router.navigate(['projet', projet.projet_id])
        }
      }
    )


  }

}
