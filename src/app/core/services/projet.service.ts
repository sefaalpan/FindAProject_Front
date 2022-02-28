import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjetForm } from '../formModels/ProjetForm';
import { Projet } from '../models/Projet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private end_point: string = '';
  private readonly userProjetsEndPoint: string = '';

  constructor(private http: HttpClient,
    private _authService: AuthService) {
    this.end_point = environment.api_url + 'projets';
    this.userProjetsEndPoint = environment.api_url + 'freelances/getProjets';
  }

  getAll() {
    return this.http.get<Projet[]>(this.end_point, {
      headers: this._authService.getAuthHeader()
    });
  }

  getAllByCategorie(id: number) {
    return this.http.get<Projet[]>(`${this.end_point}/byCategorie?categorie_id=${id}`, {
      headers: this._authService.getAuthHeader()
    });
  }

  getOneById(id: number) {
    return this.http.get<Projet>(`${this.end_point}/${id}`, {
      headers: this._authService.getAuthHeader()
    });
  }

  insert(form: ProjetForm) {
    return this.http.post<Projet>(`${this.end_point}`, form,
      {
        //Interceptors
        headers: this._authService.getAuthHeader()
      });
  }

  getUserProjet() {
    let username = this._authService.getUsername() as string;
    return this.http.get<Projet[]>(`${this.userProjetsEndPoint}?username=${username}`, {
      headers: this._authService.getAuthHeader()
    })
  }

  getProjetsByCatOrderByDateAsc(cat_id: number) {
    return this.http.get<Projet[]>(`${this.end_point}/byCatOrderByDateAsc?categorie_id=${cat_id}`);
  }

  getProjetsByCatOrderByDateDesc(cat_id: number) {
    return this.http.get<Projet[]>(`${this.end_point}/byCatOrderByDateDesc?categorie_id=${cat_id}`);
  }

  getProjetsByDateAsc() {
    return this.http.get<Projet[]>(`${this.end_point}/byDateAsc`);
  }
  getProjetsByDateDesc() {
    return this.http.get<Projet[]>(`${this.end_point}/byDateDesc`);
  }
  getProjetsSortedAsc() {
    return this.http.get<Projet[]>(`${this.end_point}/sortedAsc`);
  }
  getProjetsSortedDesc() {
    return this.http.get<Projet[]>(`${this.end_point}/sortedDesc`);
  }
  getProjetsByUsername() {
    let username = this._authService.getUsername() as string;
    return this.http.get<Projet[]>(`${this.end_point}/byUsername?username=${username}`);
  }
  getProjetsByReserveFalse() {
    return this.http.get<Projet[]>(`${this.end_point}/byReserveFalse`);
  }
  
  getProjetsByCatIdAndReserveFalse(cat_id:number) {
    return this.http.get<Projet[]>(`${this.end_point}/byCatIdReserveFalse?cat_id=${cat_id}`);
  }

  deleteProjet(id : number) {
    return this.http.delete<Projet>(`${this.end_point}/${id}`, {
      headers: this._authService.getAuthHeader()
    })
  }

  byOrderByDateAscAndReserveFalse(){
    return this.http.get<Projet[]>(`${this.end_point}/byOrderByDateAscAndReserveFalse`);
  }

  byOrderByDateDescAndReserveFalse(){
    return this.http.get<Projet[]>(`${this.end_point}/byOrderByDateDescAndReserveFalse`);
  }


}
