import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { GuidesService }    		from '../guides.service';

import { CampFilterPipe }  			from '../../../pipes/camp.filter.pipe';

import { menu }                 from './guide.menu';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
	adventure
	menu = menu
	params
	zoomed = false

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public gs: GuidesService) { this.route.params.subscribe( params => this.params = params ) }

	ngOnInit() {
		// clear cache
		this.cache.remove('settlersprime-battle-camp')
		this.cache.remove('settlersprime-battle-units')
		this.cache.remove('settlersprime-battle-general')
		// load data
		this.cache.get("settlersprime-adventure").then((adventure : any) => {
			this.adventure = adventure
			this.cache.get("settlersprime-guide").then(guide => {
				this.gs.guide = guide
				this.cache.get("settlersprime-guide-camps").then((guideCamps : Array<any>) => {
					this.gs.guide.camps = guideCamps || []
					this.progress.unset()
				})
			})
		})
	}

	selectCamp(camp){
		this.cache.set("settlersprime-battle-camp", camp)
		this.router.go("enemies")
	}

	go(item){
  	this.router.pass(item.page, {adventure: this.params.adventure, pass: item.pass})
  }
	toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
