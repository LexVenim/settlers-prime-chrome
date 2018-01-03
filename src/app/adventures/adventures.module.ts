import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
 
import { AdventureComponent }                 from './adventure/adventure.component';
import { AdventuresHomeComponent }            from './adventures-home/adventures-home.component';
import { CampsComponent, SectorFilterPipe }   from './camps/camps.component';
import { GuidesComponent, CampFilterPipe }    from './guides/guides.component';
import { GuideComponent }                     from './guide/guide.component';

import { AdventuresService }            from './adventures.service';

import { AdventuresRoutesModule }       from './adventures.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    AdventuresRoutesModule
  ],
  declarations: [
    AdventureComponent,
    AdventuresHomeComponent,
    CampsComponent,
    GuidesComponent,
    GuideComponent,

    CampFilterPipe,
    SectorFilterPipe
  ],
  providers: [ AdventuresService ]
})
export class AdventuresModule {}