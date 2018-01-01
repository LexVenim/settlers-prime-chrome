import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';
 
import { ResourceComponent }        from './resource/resource.component';
import { ResourcesComponent }       from './resources/resources.component';
import { ResourceTradeComponent }   from './resource-trade/resource-trade.component'; 

const routes: Routes = [
	{ path: 'economy', component: ResourcesComponent },
  { path: 'resources',  component: ResourcesComponent },
  { path: 'resources/:id', component: ResourceComponent },
  { path: 'resources/:id/trade', component: ResourceTradeComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EconomyRoutesModule { }