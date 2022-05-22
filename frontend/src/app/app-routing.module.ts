import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'posts-list',
    loadChildren: () => import('./posts-list/posts-list.module').then(m => m.PostsListModule)
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
