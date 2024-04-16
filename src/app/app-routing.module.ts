import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { canActivate, canActivateReverse } from './RouteGurds/authGuard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule), canActivate: [canActivate] },

  { path: 'create', component: CreateComponent,
    canDeactivate: [(comp: CreateComponent) => { return comp.canExit(); }],
    canActivate: [canActivate] },

  { path: 'login', component: LoginComponent, canActivate: [canActivateReverse] },
  { path: 'register', component: RegisterComponent, canActivate: [canActivateReverse]},
  { path: 'logout', component: HomeComponent },
  { path: 'notfound', component: NotfoundComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
