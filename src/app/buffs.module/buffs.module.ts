import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { BuffsComponent }           from './buffs/buffs.component';
import { BuffComponent }            from './buff/buff.component';

import { BuffsService }             from './buffs.service';

import { BuffsRoutesModule }        from './buffs.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    BuffsRoutesModule
  ],
  declarations: [
    BuffsComponent,
    BuffComponent
  ],
  providers: [ BuffsService ]
})
export class BuffsModule {}