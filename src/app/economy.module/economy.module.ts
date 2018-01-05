import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { ResourceComponent }        from './resource/resource.component';
import { ResourcesComponent }       from './resources/resources.component';
import { ResourceTradeComponent }   from './resource-trade/resource-trade.component';
 
import { EconomyService }           from './economy.service';

import { EconomyRoutesModule }      from './economy.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    EconomyRoutesModule
  ],
  declarations: [
    ResourceComponent,
    ResourcesComponent,
    ResourceTradeComponent
  ],
  providers: [ EconomyService ]
})
export class EconomyModule {}