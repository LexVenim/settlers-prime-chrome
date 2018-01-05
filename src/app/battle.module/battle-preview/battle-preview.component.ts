import { Component, OnInit }   from '@angular/core';

import { CacheService }        from '../../services/cache.service';
import { ProgressService }     from '../../services/progress.service';
import { RoutingService }      from '../../services/routing.service';

import { BattleService }       from '../battle.service';

@Component({
  selector: 'app-battle-preview',
  templateUrl: './battle-preview.component.html',
  styleUrls: ['./battle-preview.component.scss']
})
export class BattlePreviewComponent implements OnInit {

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,

              public bs: BattleService) { }

  ngOnInit() { 
    // clear cache
    this.cache.remove("settlersprime-battle-log")
    // clear services
    this.bs.clean()
    // load data
    this.progress.set("Purchasing maps...")
    this.cache.get("settlersprime-adventure").then((adv: any) => {
      this.bs.adventure = adv
      this.progress.set("Hiring specialists...")
      this.cache.get("settlersprime-battle-general").then(gen => {
        this.bs.general = gen
        this.progress.set("Gathering supplies...")
        this.cache.get("settlersprime-battle-mode").then(mode => {
          this.bs.mode = mode
          this.progress.set("Hiring troops...")
          this.cache.get("settlersprime-battle-units").then(units => {
            this.bs.units = units
            this.progress.unset()
          })
        })
      })
    })
  }

  simulateBattle(){
    this.progress.set("Fighting in progress...")
    this.bs.simulate().then(log => {
      this.cache.set("settlersprime-battle-log", log)
      this.router.go((this.bs.mode == "adventure" ? "battle" : "colony"), "result")
    })
  }
}
