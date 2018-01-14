import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { MineComponent }          from './mine/mine.component';
import { MinesComponent }         from './mines/mines.component';

import { MinesService }             from './mines.service';

import { MinesRoutesModule }        from './mines.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MinesRoutesModule
  ],
  declarations: [
    MineComponent,
    MinesComponent
  ],
  providers: [
    MinesService
  ]
})
export class MinesModule {}