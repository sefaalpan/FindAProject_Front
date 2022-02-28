import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/core/formModels/LoginForm';
import { AuthService } from 'src/app/core/services/auth.service';
import { PasswordEncrypt } from 'src/app/core/utils/passwordEncrypt';
import { checkLength } from 'src/app/core/validators/checkLength.validator';
import { checkPassword } from 'src/app/core/validators/checkPassword.validator';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  errors: string = '';

  constructor(private fb: FormBuilder, private _service: AuthService, private router: Router) {
    this.form = fb.group({
      username: new FormControl('', [Validators.required, checkLength(3,30)]),
      password: new FormControl('', [Validators.required, checkLength(3,30), checkPassword()]),
    })
  }

  ngOnInit(): void {
    if (this._service.isLogged())
      this.router.navigate(['profil'])
  }

  submit() {

    if (this.form.valid) {
      // this.form.value.password = PasswordEncrypt.encrypt(this.form.value.password);

      this._service.login(this.form.value as LoginForm,
        {
          next: callback => console.log(callback),
          error: err => {
            console.log(err);
            
            this.errors = 'Username et/ou mot de passe invalide'
            this.form.reset();
          },
          complete: () => {
            this.form.reset();
            this.router.navigate([''])
          }
        })


    }
  }

}
