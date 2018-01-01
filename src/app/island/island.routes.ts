import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { AcademyComponent }         from './academy/academy.component';
import { ArmoryComponent }          from './armory/armory.component';
import { BarracksComponent }        from './barracks/barracks.component';
import { BookbinderComponent }      from './bookbinder/bookbinder.component';
import { MayorHouseComponent }      from './mayor-house/mayor-house.component';
import { ProvisionHouseComponent }  from './provision-house/provision-house.component';
import { SectorComponent }          from './sector/sector.component';
import { SectorsComponent }         from './sectors/sectors.component';

const routes: Routes = [
  { path: 'island', component: SectorsComponent },
  { path: 'sectors',  component: SectorsComponent },
  { path: 'sectors/:id', component: SectorComponent },
  { path: 'academy', component: AcademyComponent },
  { path: 'armory', component: ArmoryComponent },
  { path: 'barracks', component: BarracksComponent },
  { path: 'bookbinder', component: BookbinderComponent },
  { path: 'mayorhouse', component: MayorHouseComponent },
  { path: 'provisionhouse', component: ProvisionHouseComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class IslandRoutesModule { }