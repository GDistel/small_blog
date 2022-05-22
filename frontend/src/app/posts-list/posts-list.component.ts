import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postsSvc: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsSvc.getManyPosts();
  }

}
