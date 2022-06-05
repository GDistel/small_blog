import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, first } from 'rxjs';
import { SnackbarService } from '../core/snackbar.service';
import { PostsService } from '../core/posts.service';
import { Post } from '../shared/interfaces';
import { HttpEventType } from '@angular/common/http';

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
  imageFile: File | undefined;
  uploadProgress!: number;
  @ViewChild('postForm') postForm!: NgForm;
  @ViewChild('fileUpload') fileUploadInput!: HTMLInputElement;

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
    this.imageFile = undefined;
    this.fileUploadInput.value = '';
    this.cdr.detectChanges();
  }

  private createPost(post: Partial<Post>): void {
    
    this.postsSvc.createPost(post, this.imageFile)
      .subscribe({
        next: event => {
          if (event.type == HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            return;
          }
          if (event.type === HttpEventType.Response) {
            this.postsSvc.setSelectedPost(event.body as Post);
            this.snackbarSvc.showBasicMessage('Post successfully created');
            this.resetForm();
          }
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

  onFileSelected(file: File): void {
    this.imageFile = file;
  }

}
