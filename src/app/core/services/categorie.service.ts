import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategorieForm } from '../formModels/CategorieForm';
import { Categorie } from '../models/Categorie.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private endPoint: string = '';

  constructor(private http: HttpClient, private _authService: AuthService) {
    this.endPoint = environment.api_url + 'categories';
  }

  getAll() {
    return this.http.get<Categorie[]>(`${this.endPoint}`);
  }

  getOneById(id: number) {
    return this.http.get<Categorie>(`${this.endPoint}/${id}`);
  }

  getOneByLabel(label: string) {
    return this.http.get<Categorie[]>(`${this.endPoint}/allByLabel?label=${label}`);
  }

  insert(categorieForm: CategorieForm) {
    return this.http.post<Categorie>(`${this.endPoint}`, categorieForm,
      {
        headers: this._authService.getAuthHeader()
      }
    );
  }

  update(categorieForm: CategorieForm, id:number){
    return this.http.put<Categorie>(`${this.endPoint}/${id}`, categorieForm, {
      headers: this._authService.getAuthHeader()
    })
  }
}
