import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { SectorComponent }            from './sector/sector.component';
import { SectorsComponent }           from './sectors/sectors.component';

import { SectorsService }             from './sectors.service';

import { SectorsRoutesModule }        from './sectors.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SectorsRoutesModule
  ],
  declarations: [
    SectorComponent,
    SectorsComponent
  ],
  providers: [ SectorsService ]
})
export class SectorsModule {}