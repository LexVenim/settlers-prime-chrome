import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { SoldiersComponent }        from './soldiers/soldiers.component';

import { SoldiersService }          from './soldiers.service';

import { SoldiersRoutesModule }     from './soldiers.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SoldiersRoutesModule
  ],
  declarations: [
    SoldiersComponent    
  ],
  providers: [ SoldiersService ]
})
export class SoldiersModule {}