import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, finalize, Observable, switchMap } from 'rxjs';
import { DialogService } from '../core/dialog.service';
import { PostsService } from '../core/posts.service';
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
    private router: Router,
    private dialogSvc: DialogService
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
    const message = 'Are you sure that you want to delete the selected post?';
    this.dialogSvc.openDialog(message)
      .afterClosed()
      .pipe(
        switchMap(confirms => {
          if (confirms) {
            return this.postsSvc.deleteOnePost(id)
            .pipe(
              finalize(() => {
                this.getPosts();
                this.cdr.detectChanges();
              })
            );
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

}
