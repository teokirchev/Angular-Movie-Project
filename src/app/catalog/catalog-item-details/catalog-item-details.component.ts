import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
  likeButtonColor: string = 'grey';
  textLikeColor: string = ''
  likeNumber: number = 0;
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
    private authService: AuthService,
  ) { }

  

  ngOnInit() {
    
    this.authService.getCurrentUser().subscribe(user => {
      this.loggedInUser = user;

    })

    this.paramMapObs = this.activeRoute.paramMap.pipe(
      switchMap(data => {
        this.isLoading = true;
        this.movieId = data.get('id');
        return this.movieService.getMovieById(this.movieId);
        
      }),
      switchMap(movie => {
        this.selectedMovie = movie;
        if(!this.selectedMovie.movieLikedBy) {
          this.selectedMovie.movieLikedBy = []
        }    
        console.log(this.selectedMovie);
        this.isOwner = this.selectedMovie.owner === this.loggedInUser.id;
        this.isLoading = false;
        this.likeNumber = this.selectedMovie.movieLikedBy.length;
        return this.commentService.getCommentsForMovie(this.movieId);
      })
      ).subscribe({
        next: (comments) => {
          this.allComments = comments;
          if (this.loggedInUser && this.selectedMovie.movieLikedBy && this.selectedMovie.movieLikedBy.includes(this.loggedInUser.id)) {
            this.isLikeClicked = true;
            this.likeButtonColor = 'red';
          } else {
            this.isLikeClicked = false;
            this.likeButtonColor = 'white';
          }
        }, error: (err) => {
          console.log(err);
          
          this.router.navigate(['/notfound'])
        }
      }
    );
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
    this.router.navigate(['catalog']);
  }

  editMovie() {
    this.router.navigate(['catalog/edit', this.movieId]);
  }

  likeMovie() {
    this.isLikeClicked = !this.isLikeClicked;
    
    console.log('Like');

    this.movieService.likeMovie(this.movieId)    
    .subscribe({
      next: (response) => {
        console.log(response);
        this.likeButtonColor = this.isLikeClicked ? 'red' : 'white';
        if(this.isLikeClicked) {
          console.log('yes');
          this.likeNumber++
        } else {
          console.log('no');
          this.likeNumber--
          
        }
      }
    })
    
    
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

