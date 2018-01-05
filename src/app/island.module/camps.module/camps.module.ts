import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';

import { CampsComponent }       from './camps/camps.component';

import { CampsService }         from './camps.service';

import { CampsRoutesModule }    from './camps.routes';

import { SectorFilterPipe }         from '../../pipes/sector.filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CampsRoutesModule
  ],
  declarations: [
    CampsComponent,

    SectorFilterPipe   
  ],
  providers: [ CampsService ]
})
export class CampsModule {}