import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
 
import { BattleEnemiesComponent }   from './battle-enemies/battle-enemies.component';
import { BattleGeneralsComponent }  from './battle-generals/battle-generals.component';
import { BattleHomeComponent }      from './battle-home/battle-home.component';
import { BattleLogComponent }       from './battle-log/battle-log.component';
import { BattlePreviewComponent }   from './battle-preview/battle-preview.component';
import { BattleResultComponent }    from './battle-result/battle-result.component';
import { BattleSoldiersComponent }  from './battle-soldiers/battle-soldiers.component';
import { ColonyBattleLogComponent } from './colony-battle-log/colony-battle-log.component';
import { ColonyBattleResultComponent } from './colony-battle-result/colony-battle-result.component';

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
    BattleGeneralsComponent,
    BattleHomeComponent,
    BattleLogComponent,
    BattlePreviewComponent,
    BattleResultComponent,
    BattleSoldiersComponent,
    ColonyBattleLogComponent,
    ColonyBattleResultComponent    
  ],
  providers: [ BattleService ]
})
export class BattleModule {}