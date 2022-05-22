import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent } from './post-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostDetailComponent
  ],
  imports: [
    SharedModule,
    PostDetailRoutingModule
  ]
})
export class PostDetailModule { }
