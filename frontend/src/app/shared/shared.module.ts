import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


const EXPORTED_MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ...EXPORTED_MATERIAL_MODULES
  ]
})
export class SharedModule { }
