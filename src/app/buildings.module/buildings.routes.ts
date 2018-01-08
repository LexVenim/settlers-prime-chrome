import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { BuildingsComponent }       from './buildings/buildings.component';
import { BuildingComponent }        from './building/building.component';

const routes: Routes = [
  { path: 'resources',  component: BuildingsComponent },
  { path: 'resources/:id', component: BuildingComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BuildingsRoutesModule { }