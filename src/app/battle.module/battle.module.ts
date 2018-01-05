import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
 
import { BattleComponent }          from './battle/battle.component';
import { BattleLogComponent }       from './battle-log/battle-log.component';
import { BattlePreviewComponent }   from './battle-preview/battle-preview.component';
import { BattleResultComponent }    from './battle-result/battle-result.component';

import { BattleService }            from './battle.service';

import { BattleRoutesModule }       from './battle.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    BattleRoutesModule
  ],
  declarations: [
    BattleComponent,
    BattleLogComponent,
    BattlePreviewComponent,
    BattleResultComponent
  ],
  providers: [ BattleService ]
})
export class BattleModule {}