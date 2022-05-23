import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { PostsService } from '../posts-list/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postsSvc: PostsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.posts$ = this.postsSvc.getManyPosts();
  }

  onDeletePost(id: number | undefined): void {
    this.postsSvc.deleteOnePost(id)
      .pipe(
        finalize(() => {
          console.log('ger finalize');
          this.getPosts();
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

}
