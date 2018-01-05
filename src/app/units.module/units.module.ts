import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { EnemiesModule }            from './enemies.module/enemies.module';
import { SoldiersModule }           from './soldiers.module/soldiers.module';
import { SpecialistsModule }        from './specialists.module/specialists.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    EnemiesModule,
    SoldiersModule,
    SpecialistsModule
  ],
  declarations: [],
  providers: []
})
export class UnitsModule {}