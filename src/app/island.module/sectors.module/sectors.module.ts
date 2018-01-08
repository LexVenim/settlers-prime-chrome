import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { SectorComponent }            from './sector/sector.component';
import { SectorsComponent }           from './sectors/sectors.component';
import { SectorMapComponent }         from './sector-map/sector-map.component';

import { SectorsService }             from './sectors.service';
import { SectorMapService }           from './sector.map.service';

import { SectorsRoutesModule }        from './sectors.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SectorsRoutesModule
  ],
  declarations: [
    SectorComponent,
    SectorsComponent,
    SectorMapComponent
  ],
  providers: [
    SectorsService,
    SectorMapService
  ]
})
export class SectorsModule {}