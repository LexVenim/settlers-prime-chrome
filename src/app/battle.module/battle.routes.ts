import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';
 
import { BattleComponent }          from './battle/battle.component';
import { BattleLogComponent }       from './battle-log/battle-log.component';
import { BattlePreviewComponent }   from './battle-preview/battle-preview.component';
import { BattleResultComponent }    from './battle-result/battle-result.component';

const routes: Routes = [
  { path: 'battle',  component: BattleComponent },
  { path: 'battle/log', component: BattleLogComponent },
  { path: 'battle/preview', component: BattlePreviewComponent },
  { path: 'battle/result', component: BattleResultComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BattleRoutesModule { }