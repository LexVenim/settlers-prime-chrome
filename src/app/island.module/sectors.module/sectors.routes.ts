import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { SectorComponent }          from './sector/sector.component';
import { SectorsComponent }         from './sectors/sectors.component';
import { SectorMapComponent }       from './sector-map/sector-map.component';

const routes: Routes = [
  { path: 'sectors',  component: SectorsComponent },
  { path: 'sectors/:id', component: SectorComponent },
  { path: 'sectors/:id/map', component: SectorMapComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SectorsRoutesModule { }