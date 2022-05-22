import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private postsSvc: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsSvc.getManyPosts();
  }

}
