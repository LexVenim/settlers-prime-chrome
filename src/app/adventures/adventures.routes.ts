import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';
 
import { AdventureComponent }           from './adventure/adventure.component';
import { AdventuresHomeComponent }      from './adventures-home/adventures-home.component';
import { GuidesComponent }              from './guides/guides.component';
import { GuideComponent }               from './guide/guide.component';

const routes: Routes = [
  { path: 'adventures',  component: AdventuresHomeComponent },
  { path: 'adventures/:id', component: AdventureComponent },
  { path: 'adventures/:id/guides', component: GuidesComponent },
  { path: 'adventures/:id/guides/:gid', component: GuideComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdventuresRoutesModule { }