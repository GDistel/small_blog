import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../shared/interfaces';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Comment } from '../shared/interfaces';
import { SnackbarService } from '../core/snackbar.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly selectedPostSubject = new BehaviorSubject<Post | null>(null);
  
  get selectedPost$() {
    return this.selectedPostSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private snackbarSvc: SnackbarService
  ) { }

  // Missing: implement server error handling with catchError operator

  private handleMissingIdError(): void {
    this.snackbarSvc.showBasicMessage('Post id is missing', true);
    throw new Error('Missing post id');
  }

  setSelectedPost(post: Post): void {
    this.selectedPostSubject.next(post);
  }

  getManyPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${API_URL}/posts`);
  }

  getOnePost(id: string): Observable<Post> | never {
    if (!id) {
      this.handleMissingIdError();
    }
    return this.httpClient.get<Post>(`${API_URL}/posts/${id}`);
  }

  deleteOnePost(id: number | undefined): Observable<any> | never {
    if (!id) {
      this.handleMissingIdError();
    }
    return this.httpClient.delete(
      `${API_URL}/posts/${id}`,
      { observe: 'body', responseType: 'text' }
      )
      .pipe(
        tap(() => this.snackbarSvc.showBasicMessage('Successfully deleted'))
      );
  }

  createPostComment(postId: string, comment: Comment): Observable<Comment> | never {
    if (!postId) {
      this.handleMissingIdError();
    }
    if (!comment) {
      this.snackbarSvc.showBasicMessage('Comment data is missing', true);
      throw new Error('Missing comment data');  
    }
    return this.httpClient.post<Comment>(`${API_URL}/posts/${postId}/comment`, comment);
  }
}
