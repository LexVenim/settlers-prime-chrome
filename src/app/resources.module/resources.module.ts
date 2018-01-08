import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { ResourceComponent }        from './resource/resource.component';
import { ResourcesComponent }       from './resources/resources.component';
import { ResourceTradeComponent }   from './resource-trade/resource-trade.component';
 
import { ResourcesService }         from './resources.service';

import { ResourcesRoutesModule }    from './resources.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ResourcesRoutesModule
  ],
  declarations: [
    ResourceComponent,
    ResourcesComponent,
    ResourceTradeComponent
  ],
  providers: [ ResourcesService ]
})
export class ResourcesModule {}