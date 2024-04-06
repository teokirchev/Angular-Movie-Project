import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog.component";
import { CatalogItemDetailsComponent } from "./catalog-item-details/catalog-item-details.component";
import { canActivate } from "../RouteGurds/authGuard";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
    { path: '', component: CatalogComponent },
    { path: ':id', component: CatalogItemDetailsComponent, canActivate: [canActivate] },
    { path: 'edit/:id', component: EditComponent, canDeactivate: [(comp: EditComponent) => { return comp.canExit(); }] , canActivate: [canActivate] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule {

}