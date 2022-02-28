import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Freelance } from 'src/app/core/models/Freelance.model';
import { Projet } from 'src/app/core/models/Projet.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { FreelanceService } from 'src/app/core/services/freelance.service';
import { ProjetService } from 'src/app/core/services/projet.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {

  projet !: Projet;
  afficher: boolean = false;
  freelance !: Freelance;

  constructor(private activatedRoute: ActivatedRoute,
    private _service: ProjetService,
    private router: Router,
    private _authService: AuthService,
    private _freelanceService: FreelanceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this._authService.getDiscriminator() === "FREELANCE") {
      this.afficher = true;
      this._freelanceService.getByUsername().subscribe(
        val => this.freelance = val
      )
    }
    const id = this.activatedRoute.snapshot.params['id'];
    this._service.getOneById(id).subscribe(
      data => { this.projet = data },
      err => this.router.navigate([''])
    );
  }

  developper() {

    if (this.projet.username != this.freelance.username) {
      if (!this.freelance.projets?.includes(this.projet)) {
        this.projet.reserve = true;
        this.freelance.projets?.push(this.projet);
        this._freelanceService.addUpdateProjet(this.projet, this.freelance.id).subscribe(
          f => {
            this.freelance = f
            this.toastr.success("Félicitations vous avez envoyé une demande au client")
          }
        )
      }
    }


  }
}
