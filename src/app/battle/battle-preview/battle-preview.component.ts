import { Component, OnInit } from '@angular/core';

import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../../adventures/adventures.service';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-battle-preview',
  templateUrl: './battle-preview.component.html',
  styleUrls: ['./battle-preview.component.scss']
})
export class BattlePreviewComponent implements OnInit {

  constructor(public progress: ProgressService,

    private cache: CacheService,
    private router: RoutingService,

    public ads: AdventuresService,
    public bs: BattleService) { }

  ngOnInit() { 
    this.cache.remove('settlersprime-battle-log')

    this.progress.set("Reviewing positions...")
    this.cache.get('settlersprime-adventure').then(adventure =>
      this.ads.selectIfDiffirent(adventure).then(() =>
        this.cache.get('settlersprime-battle-mode').then(mode => {
          if(this.bs.mode != mode)
            this.bs.selectMode(mode)
          this.cache.get('settlersprime-battle-units').then((units : any) => {
            if(this.bs.enemies.length == 0)
              this.bs.enemies = units.enemies
            if(this.bs.soldiers.length == 0)
              this.bs.soldiers = units.soldiers
            this.cache.get('settlersprime-battle-general').then((general : any) => {
              if(!this.bs.general)
                this.bs.selectGeneral(general)
              this.progress.unset()
            })
          })
        })))
  }

  simulateBattle(){
    this.progress.set("Fighting in progress...")
    this.bs.simulateBattle(this.ads.adventure.code).then(() => {
      this.cache.set('settlersprime-battle-log', this.bs.log)
      this.router.go(["battle", "result"])
    })
  }
}
