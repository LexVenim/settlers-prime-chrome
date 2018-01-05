import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { GuidesComponent }          from './guides/guides.component';
import { GuideComponent }           from './guide/guide.component';

const routes: Routes = [
  { path: 'guides',  component: GuidesComponent },
  { path: 'guides/:id', component: GuideComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GuidesRoutesModule { }