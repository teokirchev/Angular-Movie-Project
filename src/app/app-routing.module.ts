import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatalogItemDetailsComponent } from './catalog/catalog-item-details/catalog-item-details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'catalog/:id', component: CatalogItemDetailsComponent},

  {path: 'create', component: CreateComponent,
   canDeactivate: [(comp: CreateComponent) => {return comp.canExit();}]},

   {path:'edit/:id', component: EditComponent,
    canDeactivate:[(comp: EditComponent) => {return comp.canExit();}]},

  {path: 'login', component: LoginComponent,
  canDeactivate: [(comp: LoginComponent) => {return comp.canExit();}]},

  {path: 'register', component: RegisterComponent,
  canDeactivate: [(comp: RegisterComponent) => {return comp.canExit();}]},

  {path: 'logout', component: HomeComponent},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
