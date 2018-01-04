import { NgModule }             		from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';
 
import { BattleEnemiesComponent }   from './battle-enemies/battle-enemies.component';
import { BattleGeneralsComponent }  from './battle-generals/battle-generals.component';
import { BattleHomeComponent }      from './battle-home/battle-home.component';
import { BattleLogComponent }       from './battle-log/battle-log.component';
import { BattlePreviewComponent }   from './battle-preview/battle-preview.component';
import { BattleResultComponent }    from './battle-result/battle-result.component';
import { BattleSoldiersComponent }  from './battle-soldiers/battle-soldiers.component'; 
import { ColonyBattleLogComponent } from './colony-battle-log/colony-battle-log.component';
import { ColonyBattleResultComponent } from './colony-battle-result/colony-battle-result.component';

const routes: Routes = [
  { path: 'battle',  component: BattleHomeComponent },
  { path: 'battle/enemies', component: BattleEnemiesComponent },
  { path: 'battle/generals', component: BattleGeneralsComponent },
  { path: 'battle/log', component: BattleLogComponent },
  { path: 'battle/preview', component: BattlePreviewComponent },
  { path: 'battle/result', component: BattleResultComponent },
  { path: 'battle/soldiers', component: BattleSoldiersComponent },
  { path: 'battle/colony/log', component: ColonyBattleLogComponent },
  { path: 'battle/colony/result', component: ColonyBattleResultComponent }
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