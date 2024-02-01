import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatalogItemDetailsComponent } from './catalog/catalog-item-details/catalog-item-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'catalog/:id', component: CatalogItemDetailsComponent},
  {path: 'create', component: CreateComponent,
   canDeactivate: [(comp: CreateComponent) => {return comp.canExit();}]},
  {path: 'login', component: LoginComponent,
  canDeactivate: [(comp: LoginComponent) => {return comp.canExit();}]},
  {path: 'logout', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
