import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../core/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  noPosts = false;

  constructor(private postsSvc: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsSvc.getManyPosts()
      .pipe(
        tap(posts => this.noPosts = !posts?.length)
      );
  }

}
