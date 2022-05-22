import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostCardComponent } from './post-card/post-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommentComponent } from './comment/comment.component';
import { MatListModule } from '@angular/material/list';

const IMPORT_MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule
];

const EXPORT_MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule
];

@NgModule({
  declarations: [
    PostCardComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ...IMPORT_MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ...EXPORT_MATERIAL_MODULES,
    PostCardComponent,
    CommentComponent,
  ]
})
export class SharedModule { }
