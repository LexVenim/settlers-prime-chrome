import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { BuildingsComponent }       from './buildings/buildings.component';
import { BuildingComponent }        from './building/building.component';
 
import { BuildingsService }         from './buildings.service';

import { BuildingsRoutesModule }    from './buildings.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    BuildingsRoutesModule
  ],
  declarations: [
    BuildingsComponent,
    BuildingComponent
  ],
  providers: [ BuildingsService ]
})
export class BuildingsModule {}