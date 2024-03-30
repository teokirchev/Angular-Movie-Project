import { NgModule } from "@angular/core";
import { CatalogComponent } from "./catalog.component";
import { CatalogItemDetailsComponent } from "./catalog-item-details/catalog-item-details.component";
import { EditComponent } from "./edit/edit.component";
import { FilterComponent } from "./filter/filter.component";
import { CommentComponent } from "./catalog-item-details/comment/comment.component";
import { EditCommentComponent } from "./catalog-item-details/edit-comment/edit-comment.component";
import { MovieRatingComponent } from "./catalog-item-details/movie-rating/movie-rating.component";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared.module";

@NgModule({
    declarations: [
        CatalogComponent,
        EditComponent,
        FilterComponent,
        CatalogItemDetailsComponent,
        CommentComponent,
        EditCommentComponent,
        MovieRatingComponent,
        
    ],
    exports: [
        CatalogComponent,
        EditComponent,
        FilterComponent,
        CatalogItemDetailsComponent,
        CommentComponent,
        EditCommentComponent,
        MovieRatingComponent,
        SharedModule
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        SharedModule,
    ]
})

export class CatalogModule {

}