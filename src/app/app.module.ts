import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatalogItemComponent } from './catalog/catalog-item/catalog-item.component';
import { FilterComponent } from './catalog/filter/filter.component';
import { CatalogItemDetailsComponent } from './catalog/catalog-item-details/catalog-item-details.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CatalogComponent,
    CreateComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    NotfoundComponent,
    CatalogItemComponent,
    FilterComponent,
    CatalogItemDetailsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
