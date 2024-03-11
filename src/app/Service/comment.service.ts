import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../Models/Comment';
import { exhaustMap, map, take } from 'rxjs';
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
        const commentWithOwner = { ...comment, ownerId: user.id, ownerEmail: user.email, movieId };

        return this.http.post<{ name: string }>(
          `${this.url}comments.json`,
          commentWithOwner
        );
      })
    )
  }

  getCommentsForMovie(movieId: string) {
    return this.http.get<{ [key: string]: Comment }>(
      `${this.url}comments.json?orderBy="movieId"&equalTo="${movieId}"`
    ).pipe(
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
}
