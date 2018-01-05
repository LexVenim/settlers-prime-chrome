import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
 
import { AdventureComponent }       from './adventure/adventure.component';
import { AdventuresComponent }      from './adventures/adventures.component';

import { AdventuresService }        from './adventures.service';

import { AdventuresRoutesModule }   from './adventures.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    AdventuresRoutesModule
  ],
  declarations: [
    AdventureComponent,
    AdventuresComponent
  ],
  providers: [ AdventuresService ]
})
export class AdventuresModule {}