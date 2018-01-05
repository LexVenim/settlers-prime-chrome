import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { ColonyLogComponent }       from './colony-log/colony-log.component';
import { ColonyResultComponent }    from './colony-result/colony-result.component';

const routes: Routes = [
  { path: 'colony/log', component: ColonyLogComponent },
  { path: 'colony/result',  component: ColonyResultComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ColonyRoutesModule { }