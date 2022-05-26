import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '../interfaces';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent implements OnInit {
  @Input() maxCharacters = 50;
  @Input() post!: Post;
  imageLoaded = false;

  constructor() { }

  ngOnInit(): void {
  }

}
