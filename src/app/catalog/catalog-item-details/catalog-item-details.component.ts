import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Comment } from 'src/app/Models/Comment';
import { Movie } from 'src/app/Models/Movie';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Service/auth.service';
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

  isLoading: boolean = false;
  isLikeClicked: boolean = false;
  isCommentClick: boolean = false;
  isEditCommentClick: boolean = false;
  editedCommentData: Comment
  allComments: Comment[] = [];
  commentText: string;
  isOwner: boolean = false;
  loggedInUser: User

  constructor(
    private movieService: MovieService,
    private commentService: CommentService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);

    })

    this.paramMapObs = this.activeRoute.paramMap.pipe(
      switchMap(data => {
        this.isLoading = true;
        this.movieId = data.get('id');
        return this.movieService.getMovieById(this.movieId);
      }),
      switchMap(movie => {
        this.selectedMovie = movie;
        this.isOwner = this.selectedMovie.owner === this.loggedInUser.id;
        this.isLoading = false;
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
      });
    this.router.navigate(['/catalog']);
  }

  editMovie() {
    this.router.navigate(['/edit', this.movieId]);
  }

  likeMovie() {
    console.log('Like');
    this.isLikeClicked = true;
    
  }

  openCommentMovie() {
    this.isCommentClick = true;
  }

  closeCommentForm() {
    this.isCommentClick = false;
  }

  openEditComment(comment: Comment) {
    this.isEditCommentClick = true;
    this.editedCommentData = comment
  }

  closeEditCommentForm() {
    this.isEditCommentClick = false;
  }
  

  isCommentOwner(comment: Comment): boolean {
    return comment.ownerId === this.loggedInUser.id
  }

  createComment(comment: Comment) {
    this.commentService.createComment(comment, this.movieId)
      .subscribe(
        {
          next: (response) => {
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
          }, error: (error) => {
            // Handle HTTP error
            console.error('HTTP error', error);
          }
        });
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        this.commentService.getCommentsForMovie(this.movieId)
          .subscribe((comments) => {
            this.allComments = comments;
          });
      })
  }


  editComment(commentId: Comment) {
    this.commentService.getCommentById(commentId.id)
      .subscribe((comment: Comment) => {
        this.commentText = comment.comment;
        this.openEditComment(comment);
        this.isEditCommentClick = false
      });
  };

}

