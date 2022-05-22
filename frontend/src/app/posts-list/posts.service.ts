import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { Comment } from '../shared/interfaces';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  getManyPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${API_URL}/posts`);
  }

  getOnePost(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${API_URL}/posts/${id}`);
  }

  createPostComment(postId: string, comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${API_URL}/posts/${postId}/comment`, comment);
  }
}
