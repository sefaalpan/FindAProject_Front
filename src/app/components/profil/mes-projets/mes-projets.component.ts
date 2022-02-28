import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';
import { Projet } from 'src/app/core/models/Projet.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjetService } from 'src/app/core/services/projet.service';

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrls: ['./mes-projets.component.scss']
})
export class MesProjetsComponent implements OnInit {

  @Input()
  projets: Projet[] | null = [];
  errorSupp : string = '';

  username: string | null = ''

  constructor(private _service: ProjetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService) { }


  ngOnInit(): void {
    this.username = this._authService.getUsername();
  }

  goToProjet(id: number) {
    this.router.navigate(['projet', id]);
  }

  delete(id: number, username: string) {

    if (this.username === username) {

      if (confirm("Voulez-vous vraiment supprimer ce projet?" + '\n\n' + "Cette action est irréversible!")) {
        this._service.deleteProjet(id)
          .pipe(
            mergeMap(() => this._service.getProjetsByUsername())
          )
          .subscribe({
            next: datas => this.projets = datas,
            error: err => this.errorSupp='Erreur lors de la suppression',
            complete: () => this.toastr.success("Suppression effectuée avec succès")
          });
      }
      // alert(id)
    }
  }
}
