import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdresseForm } from 'src/app/core/formModels/AdresseForm';
import { RegisterForm } from 'src/app/core/formModels/RegisterForm';
import { ValidErrors } from 'src/app/core/models/ValidationErrors.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PasswordEncrypt } from 'src/app/core/utils/passwordEncrypt';
import { checkLength } from 'src/app/core/validators/checkLength.validator';
import { checkPassword } from 'src/app/core/validators/checkPassword.validator';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  error: string = ''
  nomErrors: String[] = [];
  validErrors!: ValidErrors;

  constructor(private fb: FormBuilder, private _service: AuthService, private router: Router) {
    this.form = fb.group({
      nom: new FormControl('', [Validators.required, checkLength(3, 50)]),
      prenom: new FormControl('', [Validators.required, checkLength(3, 50)]),
      username: new FormControl('', [Validators.required, checkLength(3, 30)]),
      password: new FormControl('', [Validators.required, checkLength(8, 30), checkPassword()]),
      confirmPassword: new FormControl('', [Validators.required, checkLength(8, 30), checkPassword()]),
      email: new FormControl('', [Validators.required, Validators.email, checkLength(5, 30)]),
      naissance: new FormControl('', [Validators.required]),
      discriminator: new FormControl('', Validators.required),
      rue: new FormControl('', [Validators.required, checkLength(3, 30)]),
      numero: new FormControl('', [Validators.required, checkLength(1, 30)]),
      ville: new FormControl('', [Validators.required, checkLength(3, 30)]),
      cp: new FormControl('', [Validators.required, checkLength(3, 30)]),
      pays: new FormControl('', [Validators.required, checkLength(3, 30)]),
    })
  }

  ngOnInit(): void {
    if (this._service.isLogged())
      this.router.navigate([''])
  }

  submit() {
    if (this.form.valid) {
      const password = this.form.value.password;
      const confirmPassword = this.form.value.confirmPassword;
      const discriminator = this.form.value.discriminator;
      const nom = this.form.value.nom;
      const prenom = this.form.value.prenom;
      const email = this.form.value.email;
      const username = this.form.value.username;
      const naissance = this.form.value.naissance;
      const rue = this.form.value.rue;
      const numero = this.form.value.numero;
      const ville = this.form.value.ville;
      const codepostal = this.form.value.cp;
      const pays = this.form.value.pays;

      if (confirmPassword === password) {
        // const crypted = PasswordEncrypt.encrypt(password);
        // let user: User = this.form.value as User;

        const adresse: AdresseForm = { rue: rue, numero: numero, ville: ville, codePostal: codepostal, pays: pays };

        const registerForm: RegisterForm = {
          username: username,
          password: password,
          email: email,
          discriminator: discriminator,
          nom: nom,
          prenom: prenom,
          naissance: naissance,
          address: adresse
        }

        this._service.signup(registerForm, {
          next: val => {
            if (val != null) {
              this.form.reset()
              this.router.navigate(['home']);
            }
            else {
              this.error = "Erreur lors de l'inscription, veuillez choisir un autre username"
            }
          },
          error: err => {
            if(err){
              this.validErrors = err.error as ValidErrors;
            }
          },
          complete: () => {
            // this.router.navigate(['home']);
          }
        })



      }
    }

  }



}
