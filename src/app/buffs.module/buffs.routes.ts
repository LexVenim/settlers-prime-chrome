import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { BuffsComponent }       		from './buffs/buffs.component';
import { BuffComponent }        		from './buff/buff.component';

const routes: Routes = [
  { path: 'buffs',  component: BuffsComponent },
  { path: 'buffs/:id', component: BuffComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BuffsRoutesModule { }