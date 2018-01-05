import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { SoldiersComponent } from './soldiers/soldiers.component';


const routes: Routes = [
  { path: 'soldiers', component: SoldiersComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SoldiersRoutesModule { }