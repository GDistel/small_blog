import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, first } from 'rxjs';
import { SnackbarService } from '../core/snackbar.service';
import { PostsService } from '../core/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditorComponent implements OnInit {
  title!: string;
  content!: string;
  id!: number;
  isNew = false;
  @ViewChild('postForm') postForm!: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsSvc: PostsService,
    private cdr: ChangeDetectorRef,
    private snackbarSvc: SnackbarService
  ) { }

  ngOnInit(): void {
    this.isNew = !!this.activatedRoute.snapshot.queryParamMap.get('new');
    if (!this.isNew) {
      this.postsSvc.selectedPost$
        .pipe(
          filter(post => !!post),
          first(),
        ).subscribe({
          next: result => {
            const post = result as Post;
            this.title = post.title;
            this.content = post.content;
            this.id = post.id as number;
          }
        });
    }
  }

  private resetForm(): void {
    this.postForm.resetForm();
    this.cdr.detectChanges();
  }

  private createPost(post: Partial<Post>): void {
    
    this.postsSvc.createPost(post)
      .subscribe({
        next: post => {
          this.postsSvc.setSelectedPost(post);
          this.snackbarSvc.showBasicMessage('Post successfully created');
          this.resetForm();
        }
      });
  }

  private updatePost(post: Partial<Post>): void {
    post.id = this.id;
    this.postsSvc.updatePost(post)
      .subscribe({
        next: post => {
          this.snackbarSvc.showBasicMessage('Post successfully updated');
        }
      });
  }

  onSubmit(): void {
      // Missing better controls validation
    const postData: Partial<Post> = {
      title: this.title,
      content: this.content,
      imageUrl: `https://source.unsplash.com/random/1200x900?sig=${Math.floor(Math.random() * 10)}`
    };
    if (this.isNew) {
      this.createPost(postData);
    } else {
      this.updatePost(postData);
    }
  }

}
