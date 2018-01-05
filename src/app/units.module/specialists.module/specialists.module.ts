import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { SpecialistsComponent }     from './specialists/specialists.component';

import { SpecialistsService }       from './specialists.service';

import { SpecialistsRoutesModule }  from './specialists.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SpecialistsRoutesModule
  ],
  declarations: [
    SpecialistsComponent    
  ],
  providers: [ SpecialistsService ]
})
export class SpecialistsModule {}