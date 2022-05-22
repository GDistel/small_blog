import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { PostsService } from '../posts-list/posts.service';
import { Post, Comment } from '../shared/interfaces';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  email!: string;
  comment!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsSvc: PostsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.postsSvc.getOnePost(postId as string)
      .pipe(
        first()
      ).subscribe({
        next: res => {
          this.post = (res as any).post;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmitComment(): void {
    const commentData: Comment = { email: this.email, text: this.comment };
    this.postsSvc.createPostComment(String(this.post.id), commentData)
      .subscribe({
        next: comment => {
          this.post.comments.push(comment);
          this.cdr.detectChanges();
        }
      });
  }

}
