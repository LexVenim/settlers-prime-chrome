import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { CampsComponent }         from './camps/camps.component';

const routes: Routes = [
  { path: 'camps',  component: CampsComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampsRoutesModule { }