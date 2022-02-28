import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Freelance } from '../models/Freelance.model';
import { Projet } from '../models/Projet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FreelanceService {

  private end_point: string = '';

  constructor(private http: HttpClient, private _service: AuthService) {
    this.end_point = environment.api_url + 'freelances';
  }

  getAll() {
    console.log(this._service.getAuthHeader());

    return this.http.get<Freelance[]>(`${this.end_point}`, {
      headers: this._service.getAuthHeader()
    });
  }

  getByUsername() {
    let username = this._service.getUsername();
    return this.http.get<Freelance>(`${this.end_point}/byUsername?username=${username}`, {
      headers: this._service.getAuthHeader()
    });
  }

  // addProjet(projet: Projet, freelance: Freelance) {
  //   return this.http.post<Freelance>(`${this.end_point}/projet`, [freelance, projet], {
  //     headers: this._service.getAuthHeader()
  //   });
  // }

  // addProjet(projet_id : number, freelance_id : number) {
  //   return this.http.post<Freelance>(`${this.end_point}/addProjet`, [projet_id, freelance_id], {
  //     headers: this._service.getAuthHeader()
  //   })
  // }

  // updateAddProjet(freelance : Freelance) {
  //   return this.http.put<Freelance>(`${this.end_point}/addProjet`, freelance, {
  //     headers : this._service.getAuthHeader()
  //   })
  // }

  addProjet(freelance: Freelance) {
    return this.http.post<Freelance>(`${this.end_point}/addProjet`, freelance, {
      headers: this._service.getAuthHeader()
    })
  }


  addUpdateProjet(projet: Projet, id: number) {
    return this.http.put<Freelance>(`${this.end_point}/addUpdateProjet/${id}`, projet, {
      headers: this._service.getAuthHeader()
    })
  }

  delete(id: number) {
    return this.http.delete<Freelance>(`${this.end_point}/${id}`, {
      headers: this._service.getAuthHeader()
    })
  }

}
