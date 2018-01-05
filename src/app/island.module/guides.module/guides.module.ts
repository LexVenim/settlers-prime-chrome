import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { GuidesComponent }          from './guides/guides.component';
import { GuideComponent }           from './guide/guide.component';

import { GuidesService }            from './guides.service';
import { GuideUnitNamesService }    from './guide.unitnames.service';

import { GuidesRoutesModule }       from './guides.routes';

import { CampFilterPipe }           from '../../pipes/camp.filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    GuidesRoutesModule
  ],
  declarations: [
    GuideComponent,
    GuidesComponent,

    CampFilterPipe 
  ],
  providers: [
    GuidesService,
    GuideUnitNamesService
  ]
})
export class GuidesModule {}