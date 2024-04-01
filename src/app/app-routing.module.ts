import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatalogItemDetailsComponent } from './catalog/catalog-item-details/catalog-item-details.component';
import { EditComponent } from './catalog/edit/edit.component';
import { canActivate } from './RouteGurds/authGuard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'catalog', component: CatalogComponent,
    canActivate: [canActivate] },

  { path: 'catalog/:id', component: CatalogItemDetailsComponent,
    canActivate: [canActivate] },

  { path: 'edit/:id', component: EditComponent,
      canDeactivate: [(comp: EditComponent) => { return comp.canExit(); }],
      canActivate: [canActivate] },

  { path: 'create', component: CreateComponent,
    canDeactivate: [(comp: CreateComponent) => { return comp.canExit(); }],
    canActivate: [canActivate] },

  { path: 'login', component: LoginComponent,
    // canDeactivate: [(comp: LoginComponent) => {return comp.canExit();}]
  },

  { path: 'register', component: RegisterComponent,
    // canDeactivate: [(comp: RegisterComponent) => {return comp.canExit();}]
  },

  { path: 'logout', component: HomeComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
