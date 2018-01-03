import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BackendService, Adventure } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../adventures.service';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-adventures-home',
  templateUrl: './adventures-home.component.html',
  styleUrls: ['./adventures-home.component.scss']
})
export class AdventuresHomeComponent implements OnInit {
  params

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
    private route: ActivatedRoute,

    public ads: AdventuresService,
    private battle: BattleService) {
    this.route.params.subscribe( params => this.params = params );
  }

  ngOnInit() {
    this.progress.set('Looking for trouble...')

    this.cache.remove('settlersprime-adventure')
    this.cache.remove('settlersprime-battle-adventure')

    this.ads.loadAdventureCategories().then(() => this.progress.unset())
  }

  selectAdventure(adventure){
  	switch (this.params.parent) {

      case "battle":
        this.progress.set('Looking for trouble...')
        this.cache.set('settlersprime-battle-adventure', adventure)
        this.progress.unset()
        this.router.go(["adventures", adventure, "camps", {parent: 'battle'}])
        break;

      default:
        this.progress.set('Looking for trouble...')
        this.cache.set('settlersprime-adventure', adventure)
        this.router.go(["adventures", adventure])
        break;
    }
  }

}
