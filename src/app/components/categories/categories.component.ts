import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';
import { CategorieForm } from 'src/app/core/formModels/CategorieForm';
import { Categorie } from 'src/app/core/models/Categorie.model';
import { User } from 'src/app/core/models/User.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = [];
  search: string = '';
  admin: User | null = null;
  afficherForm: boolean = false;
  form = new FormGroup({})
  modif: boolean = false;
  cat_id: number = 0;

  constructor(
    private toastr: ToastrService,
    private _service: CategorieService,
    private router: Router,
    private _userService: UserService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      label: new FormControl('', Validators.required)
    })
  }


  ngOnInit(): void {

    let sub = this._userService.getByUsername().subscribe({
      next: val => {
        if (val.roles.includes("ROLE_ADMIN"))
          this.admin = val;
        else this.admin = null;
        console.log(val);

      },
      error: err => console.log(err),
      complete: () => { sub.unsubscribe() }
    })

    this._service.getAll().subscribe(data => {
      this.categories = data
    });
  }

  displayProjects(cat_id: number) {
    this.router.navigate(['projets', cat_id]);
  }

  rechercher() {

    if (this.search === '') {
      this._service.getAll().subscribe(
        datas => this.categories = datas
      )
    } else {

      this._service.getOneByLabel(this.search).subscribe(
        next => {
          this.categories = next;
          this.search = '';
        },
        err => {
          console.log(err);

        },

      )
    }
  }

  onSubmit() {

    if (this.admin) {

      if (this.form.valid) {
        this._service.insert(this.form.value as CategorieForm)
          .pipe(
            mergeMap(
              () => this._service.getAll()
            )
          )
          .subscribe({
            next: datas => this.categories = datas,
            error: err => console.log(err),
            complete: () => {
              this.toastr.success(this.form.value.label + " a été ajoutée")
              this.form.reset();
              this.afficherForm = !this.afficherForm
            }

          });
      }
    }
  }

  modifier(label: string, id: number) {
    this.cat_id = id;
    this.modif = !this.modif;
    this.form.patchValue({ label: label })
  }

  onUpdate() {
    if (this.admin) {

      if (this.form.valid) {
        if (this.cat_id != 0) {
          this._service.update(this.form.value as CategorieForm, this.cat_id)
            .pipe(
              mergeMap(
                () => this._service.getAll()
              )
            )
            .subscribe({
              next: datas => this.categories = datas,
              error: err => console.log(err),
              complete: () => {
                this.toastr.success(this.form.value.label + " a été modifiée")
                this.form.reset();
                this.modif = !this.modif
              }

            });
        }
      }
    }

  }


}