import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { MineComponent }          from './mine/mine.component';
import { MinesComponent }         from './mines/mines.component';

const routes: Routes = [
  { path: 'mines',  component: MinesComponent },
  { path: 'mines/:id', component: MineComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MinesRoutesModule { }