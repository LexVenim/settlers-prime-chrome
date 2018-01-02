import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';

import { BackendService, Adventure } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventureService } from '../../services/adventure.service';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-adventures-home',
  templateUrl: './adventures-home.component.html',
  styleUrls: ['./adventures-home.component.scss']
})
export class AdventuresHomeComponent implements OnInit {

  categories = {
    "tutorial": {name: "Tutorial", order: 0},
    "xp": {name: "Experience", order: 1},
    "treasure": {name: "Treasure", order: 2},
    "epic": {name: "Epic", order: 3},
    "mini": {name: "Mini", order: 4},
    "continue": {name: "Continue", order: 5},
    "venture": {name: "Venture", order: 6},
    "fairy": {name: "Fairytale", order: 7},
    "arabian": {name: "1001 Nights", order: 8},
    "multiplayer": {name: "Coop", order: 9},
    "scenarios": {name: "Scenarios", order: 10},
    "event": {name: "Event", order: 11}
  }

  constructor(public progress: ProgressService,

    private backend: BackendService,
    private cache: CacheService,
    private router: RoutingService,

    public ads: AdventureService,
    private battle: BattleService) { }

  ngOnInit() {
    this.progress.set('Looking for trouble...')
    this.battle.clean()

    this.cache.remove('settlersprime-adventure')
    this.cache.remove('settlersprime-battle-adventure')

    this.ads.loadAdventureCategories().then(() => this.progress.unset())
  }

  selectAdventure(adventure){
  	switch (this.router.prev()) {

      case "battle":
        this.progress.set('Looking for trouble...')
        this.battle.selectAdventure(adventure).then(() => {
          this.cache.set('settlersprime-battle-adventure', this.ads.adventure.code)
          this.progress.unset()
          this.router.go("camps")
        })
        break;

      default:
        this.progress.set('Looking for trouble...')
        this.ads.select(adventure).then(() => {
          console.log(this.ads.adventure)
          this.cache.set('settlersprime-adventure', this.ads.adventure.code)
          this.progress.unset()
          this.router.go("adventure_info")
        })
        break;
    }
  }

}
