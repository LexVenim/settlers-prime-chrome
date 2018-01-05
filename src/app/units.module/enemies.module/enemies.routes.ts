import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { EnemiesComponent }         from './enemies/enemies.component';

const routes: Routes = [
  { path: 'enemies', component: EnemiesComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EnemiesRoutesModule { }