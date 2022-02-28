import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FreelanceViewComponent } from './components/freelance-view/freelance-view.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocaledatePipe } from './core/pipes/localedate.pipe';
import { ProjetComponent } from './components/projet/projet.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ProfilComponent } from './components/profil/profil.component';
import { CreateProjetComponent } from './components/create-projet/create-projet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MesProjetsComponent } from './components/profil/mes-projets/mes-projets.component';
@NgModule({
  declarations: [
    AppComponent,
    FreelanceViewComponent,
    ProjetsComponent,
    HomeComponent,
    NavComponent,
    CategoriesComponent,
    LocaledatePipe,
    ProjetComponent,
    InscriptionComponent,
    ConnexionComponent,
    ProfilComponent,
    CreateProjetComponent,
    MesProjetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
