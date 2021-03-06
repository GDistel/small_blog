import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostCardComponent } from './post-card/post-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommentComponent } from './comment/comment.component';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator/paginator.component';
import { WaitWithPlaceholder } from './wait-with-placeholder.directive';
import { SliceWithDotsPipe } from './slice-with-dots.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const IMPORT_MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatPaginatorModule
];

const EXPORT_MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [
    PostCardComponent,
    CommentComponent,
    ConfirmDialogComponent,
    PaginatorComponent,
    WaitWithPlaceholder,
    SliceWithDotsPipe
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
    ConfirmDialogComponent,
    PaginatorComponent,
    WaitWithPlaceholder
  ]
})
export class SharedModule { }
