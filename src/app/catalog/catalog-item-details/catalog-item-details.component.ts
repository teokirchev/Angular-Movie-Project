import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Comment } from 'src/app/Models/Comment';
import { Movie } from 'src/app/Models/Movie';
import { CommentService } from 'src/app/Service/comment.service';
import { MovieService } from 'src/app/Service/movie.service';

@Component({
  selector: 'app-catalog-item-details',
  templateUrl: './catalog-item-details.component.html',
  styleUrls: ['./catalog-item-details.component.css']
})
export class CatalogItemDetailsComponent implements OnInit, OnDestroy {

  selectedMovie: Movie;
  movieId: string;
  paramMapObs;

  isCommentClick: boolean = false;
  allComments: Comment[] = [];

  constructor(
    private movieService: MovieService,
    private commentService: CommentService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.paramMapObs = this.activeRoute.paramMap.pipe(
      switchMap(data => {
        this.movieId = data.get('id');
        return this.movieService.getMovieById(this.movieId);
      }),
      switchMap(movie => {
        this.selectedMovie = movie;
        return this.commentService.getCommentsForMovie(this.movieId);
      })
    ).subscribe((comments) => {
      this.allComments = comments;
    });
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe()
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movieId)
      .subscribe(() => {
        this.movieService.getAllmovies().subscribe((movies) => {
          this.movieService.moviesUpdated.emit(movies)
        });
      });;
    this.router.navigate(['/catalog']);
  }

  editMovie() {
    this.router.navigate(['/edit', this.movieId]);
  }

  commentMovie() {
    this.isCommentClick = true;
  }

  closeCommentForm() {
    this.isCommentClick = false;
  }

  // createComment(comment: Comment) {
  //   this.commentService.createComment(comment, this.movieId)
  //   .subscribe(() => {
  //     this.commentService.getCommentsForMovie(this.movieId)
  //     .subscribe((comments) => {
  //       this.allComments = comments
  //     });
  //   });
  // }
  createComment(comment: Comment) {
    this.commentService.createComment(comment, this.movieId)
      .subscribe(response => {
        // Check if the response is successful
        if (response && response.name) {
          // Successfully created the comment, fetch updated comments
          this.commentService.getCommentsForMovie(this.movieId)
            .subscribe((comments) => {
              this.allComments = comments;
            });
        } else {
          // Handle error case here
          console.error('Failed to create comment');
        }
      }, error => {
        // Handle HTTP error
        console.error('HTTP error', error);
      });
  }

}

