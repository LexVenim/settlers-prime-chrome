import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';
 
import { AdventureComponent }           from './adventure/adventure.component';
import { AdventuresComponent }      from './adventures/adventures.component';

const routes: Routes = [
  { path: 'adventures',  component: AdventuresComponent },
  { path: 'adventures/:id', component: AdventureComponent }
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