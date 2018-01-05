import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { EnemiesComponent }         from './enemies/enemies.component';

import { EnemiesService }           from './enemies.service';

import { EnemiesRoutesModule }      from './enemies.routes';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    EnemiesRoutesModule
  ],
  declarations: [
    EnemiesComponent    
  ],
  providers: [ EnemiesService ]
})
export class EnemiesModule {}