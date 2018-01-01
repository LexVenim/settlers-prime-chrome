import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { AcademyComponent }         from './academy/academy.component';
import { ArmoryComponent }          from './armory/armory.component';
import { BarracksComponent }        from './barracks/barracks.component';
import { BookbinderComponent }      from './bookbinder/bookbinder.component';
import { MayorHouseComponent }      from './mayor-house/mayor-house.component';
import { ProvisionHouseComponent }  from './provision-house/provision-house.component';
import { SectorComponent }          from './sector/sector.component';
import { SectorsComponent }         from './sectors/sectors.component';

import { IslandService }            from './island.service';

import { IslandRoutesModule }       from './island.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    IslandRoutesModule
  ],
  declarations: [
    AcademyComponent,
    ArmoryComponent,
    BarracksComponent,
    BookbinderComponent,
    MayorHouseComponent,
    ProvisionHouseComponent,
    SectorComponent,
    SectorsComponent    
  ],
  providers: [ IslandService ]
})
export class IslandModule {}