import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared.module";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule
    ]
})

export class AuthModule {

}