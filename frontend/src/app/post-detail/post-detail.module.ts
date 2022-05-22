import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent } from './post-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostDetailComponent
  ],
  imports: [
    SharedModule,
    PostDetailRoutingModule,
    FormsModule
  ]
})
export class PostDetailModule { }
