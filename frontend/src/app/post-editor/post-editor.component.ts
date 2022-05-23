import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, first } from 'rxjs';
import { PostsService } from '../posts-list/posts.service';
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
  @ViewChild('postForm') commentForm!: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsSvc: PostsService
  ) { }

  ngOnInit(): void {
    const isNew = this.activatedRoute.snapshot.queryParamMap.get('new');
    if (!isNew) {
      this.postsSvc.selectedPost$
        .pipe(
          filter(post => !!post),
          first(),
        ).subscribe({
          next: post => {
            this.title = (post as Post).title;
            this.content = (post as Post).content;
          }
        });
    }
  }

  onSubmit(): void {

  }

}
