import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Freelance } from 'src/app/core/models/Freelance.model';
import { User } from 'src/app/core/models/User.model';
import { FreelanceService } from 'src/app/core/services/freelance.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-freelance-view',
  templateUrl: './freelance-view.component.html',
  styleUrls: ['./freelance-view.component.scss']
})
export class FreelanceViewComponent implements OnInit {

  freelances: Freelance[] = [];
  admin: User | null = null;

  constructor(private _freelanceService: FreelanceService,
    private _userService: UserService) { }

  ngOnInit(): void {

    let sub = this._userService.getByUsername().subscribe({
      next: val => {
        if (val.roles.includes("ROLE_ADMIN"))
          this.admin = val;
        else this.admin = null;
      },
      error: err => console.log(err),
      complete: () => { sub.unsubscribe() }
    })

    this._freelanceService.getAll().subscribe(data => {
      this.freelances = data;
    });
  }

  delete(id: number) {

    if (confirm("Voulez-vous vraiment supprimer ce freelance?" + '\n\n' + "Cette action est irréversible!")) {
      this._freelanceService.delete(id)
        .pipe(
          mergeMap(
            () => this._freelanceService.getAll()
          )
        )
        .subscribe(datas => this.freelances = datas)
    }
  }

}
