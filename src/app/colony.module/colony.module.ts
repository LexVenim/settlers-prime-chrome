import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { ColonyLogComponent }       from './colony-log/colony-log.component';
import { ColonyResultComponent }    from './colony-result/colony-result.component';

import { ColonyService }            from './colony.service';

import { ColonyRoutesModule }       from './colony.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ColonyRoutesModule
  ],
  declarations: [
    ColonyLogComponent,
    ColonyResultComponent
  ],
  providers: [ ColonyService ]
})
export class ColonyModule {}