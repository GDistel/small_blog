import { NgModule } from '@angular/core';

import { PostEditorRoutingModule } from './post-editor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostEditorComponent } from './post-editor.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostEditorComponent
  ],
  imports: [
    SharedModule,
    PostEditorRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class PostEditorModule { }
