import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
 
import { BattleEnemiesComponent }   from './battle-enemies/battle-enemies.component';
import { BattleHomeComponent }      from './battle-home/battle-home.component';
import { BattleLogComponent }       from './battle-log/battle-log.component';
import { BattlePreviewComponent }   from './battle-preview/battle-preview.component';
import { BattleResultComponent }    from './battle-result/battle-result.component';
import { BattleSoldiersComponent }  from './battle-soldiers/battle-soldiers.component';

import { BattleService }            from './battle.service';

import { BattleRoutesModule }             from './battle.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    BattleRoutesModule
  ],
  declarations: [
    BattleEnemiesComponent,
    BattleHomeComponent,
    BattleLogComponent,
    BattlePreviewComponent,
    BattleResultComponent,
    BattleSoldiersComponent
  ],
  providers: [ BattleService ]
})
export class BattleModule {}