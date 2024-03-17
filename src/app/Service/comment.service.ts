import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../Models/Comment';
import { exhaustMap, map, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  url = 'https://angular-movie-project-732b7-default-rtdb.firebaseio.com/';

  createComment(comment: Comment, movieId: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const commentWithOwner = {
          ...comment, ownerId: user.id, ownerEmail: user.email, movieId
        };

        return this.http.post<{ name: string }>(
          `${this.url}comments.json`,
          commentWithOwner,
          { params: new HttpParams().set('auth', user.token) }
        );
      })
    )
  }

  getCommentsForMovie(movieId: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<{ [key: string]: Comment }>
          (`${this.url}comments.json`,
            {
              params: new HttpParams()
                .set('orderBy', '"movieId"')
                .set('equalTo', `"${movieId}"`)
                .set('auth', user.token)
            }
          )
      }),
      map((response) => {
        let comments = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            comments.push({ ...response[key], id: key });
          }
        }
        return comments;
      })
    );
  }

  getCommentById(commentId: string) {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<Comment>(
          `${this.url}comments/${commentId}.json`,
          { params: new HttpParams().set('auth', user.token) }
        );
      })
    );
  }

  deleteComment(id: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.delete(`${this.url}comments/${id}.json`,
          { params: new HttpParams().set('auth', user.token) }
        )
      })
    )
  }

  editComment(id: string, editedComment: Comment) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.put(
          `${this.url}comments/${id}.json`,editedComment,
          { params: new HttpParams().set('auth', user.token) }
        )
      })
    )
  }

}
