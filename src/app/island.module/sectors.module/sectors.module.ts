import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { SectorComponent }            from './sector/sector.component';
import { SectorsComponent }           from './sectors/sectors.component';
import { SectorMapComponent }         from './sector-map/sector-map.component';

import { SectorsService }             from './sectors.service';
import { SectorMapService }           from './sector.map.service';

import { SectorsRoutesModule }        from './sectors.routes';

import { AvailableFilterPipe }               from './pipes/available.filter.pipe';
import { BtFilterPipe }               from './pipes/bt.filter.pipe';
import { BuffFilterPipe }               from './pipes/buff.filter.pipe';
import { BuildingsFilterPipe }        from './pipes/buildings.filter.pipe';
import { CampFilterPipe }               from './pipes/camp.filter.pipe';
import { ResourcesFilterPipe }        from './pipes/resources.filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SectorsRoutesModule
  ],
  declarations: [
    SectorComponent,
    SectorsComponent,
    SectorMapComponent,

    AvailableFilterPipe,
    BtFilterPipe,
    BuffFilterPipe,
    BuildingsFilterPipe,
    CampFilterPipe,
    ResourcesFilterPipe
  ],
  providers: [
    SectorsService,
    SectorMapService
  ]
})
export class SectorsModule {}