import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { AdventuresService }    from '../adventures.service';

import { menu }                 from './adventure.menu';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss']
})
export class AdventureComponent implements OnInit {
  menu = menu
	params
  zoomed = false

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public ads: AdventuresService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
    // load data
    this.progress.set('Looking for trouble...')
    this.cache.get("settlersprime-adventure").then(adv => {
      this.ads.adventure = adv
      this.progress.unset()
    })
  }

  go(item){
  	this.router.pass(item.page, {adventure: this.params.id, pass: item.pass})
  }

  toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
