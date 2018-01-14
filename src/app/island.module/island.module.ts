import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { AdventuresModule }         from './adventures.module/adventures.module';
import { CampsModule }              from './camps.module/camps.module';
import { GuidesModule }             from './guides.module/guides.module';
import { MinesModule }              from './mines.module/mines.module';
import { SectorsModule }            from './sectors.module/sectors.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    AdventuresModule,
    CampsModule,
    GuidesModule,
    MinesModule,
    SectorsModule
  ],
  declarations: [],
  providers: []
})
export class IslandModule {}