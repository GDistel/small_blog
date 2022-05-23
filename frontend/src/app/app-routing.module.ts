import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'posts-list',
    loadChildren: () => import('./posts-list/posts-list.module').then(m => m.PostsListModule)
  },
  {
    path: 'post-detail/:id',
    loadChildren: () => import('./post-detail/post-detail.module').then(m => m.PostDetailModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'post-editor',
    loadChildren: () => import('./post-editor/post-editor.module').then(m => m.PostEditorModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
