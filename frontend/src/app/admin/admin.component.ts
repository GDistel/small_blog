import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
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

  constructor(
    private postsSvc: PostsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.posts$ = this.postsSvc.getManyPosts();
  }

  onEditPost(post: Post): void {
    this.postsSvc.setSelectedPost(post);
    this.router.navigate(['/', 'post-editor']);
  }

  onDeletePost(id: number | undefined): void {
    // Add dialog prompting the user if he/she is sure to delete
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
