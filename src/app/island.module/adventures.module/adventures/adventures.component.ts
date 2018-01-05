import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { AdventuresService }    from '../adventures.service';

import { categories }           from './adventures.menu';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.scss']
})
export class AdventuresComponent implements OnInit {
  categories = categories
  params

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public ads: AdventuresService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
    // clear cache
    this.cache.remove('settlersprime-adventure')
    // load data
    this.progress.set('Looking for trouble...')
    this.ads.loadAdventureCategories().then(() => this.progress.unset())
  }

  selectAdventure(adv){
    this.progress.set('Looking for trouble...')
    this.ads.get(adv).then((adventure : any) => {
      this.cache.set('settlersprime-adventure', adventure)
      this.params.battle ? this.router.pass("sectors", {adventure: adventure.code, pass: "camps"}) : this.router.go("adventures", adventure.code)
    })
  }

}
