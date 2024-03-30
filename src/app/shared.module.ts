import { NgModule } from "@angular/core";
import { LoaderComponent } from "./utility/loader/loader.component";
import { ErrorSnackbarComponent } from "./utility/error-snackbar/error-snackbar.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoaderComponent,
        ErrorSnackbarComponent,
    ],
    exports: [
        LoaderComponent,
        ErrorSnackbarComponent,
        FormsModule
    ],
    imports: [
        FormsModule,
    ]
})

export class SharedModule{

}