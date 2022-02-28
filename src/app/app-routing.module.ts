import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CreateProjetComponent } from './components/create-projet/create-projet.component';
import { FreelanceViewComponent } from './components/freelance-view/freelance-view.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { UserGuard } from './core/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'freelances', component: FreelanceViewComponent, canActivate: [UserGuard] },
  { path: 'projets', component: ProjetsComponent },
  { path: 'projets/:cat_id', component: ProjetsComponent },
  { path: 'projet/:id', component: ProjetComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'create-projet', component: CreateProjetComponent, canActivate: [UserGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [UserGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
