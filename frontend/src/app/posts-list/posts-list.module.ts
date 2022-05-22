import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsListRoutingModule } from './posts-list-routing.module';
import { PostsListComponent } from './posts-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostsListComponent
  ],
  imports: [
    SharedModule,
    PostsListRoutingModule
  ]
})
export class PostsListModule { }
