import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { map, Observable, pluck, tap } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../core/posts.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  noPosts = false;
  page = 1;
  limit = 3;
  total!: number;

  constructor(private postsSvc: PostsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.posts$ = this.getPosts();
  }

  onPageEvent(pageEvent: PageEvent): void {
    this.page = pageEvent.pageIndex + 1; // it's 0 based
    this.limit = pageEvent.pageSize;
    this.posts$ = this.getPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.postsSvc.getManyPosts(this.page, this.limit)
    .pipe(
      tap(res => {
        this.page = res.page;
        this.limit = res.limit;
        this.total = res.total;
      }),
      map(res => res.data as Post[]),
      tap(posts => this.noPosts = !posts?.length)
    );
  }

}
