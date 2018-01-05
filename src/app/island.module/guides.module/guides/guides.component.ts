import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { GuidesService }    		from '../guides.service';

import { CampFilterPipe }  			from '../../../pipes/camp.filter.pipe';

import { menu }                 from './guides.menu';

@Component({
	selector: 'app-guides',
	templateUrl: './guides.component.html',
	styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit {
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
		this.cache.remove('settlersprime-guide')

		this.progress.set('Looking for guidance...')
		this.cache.get("settlersprime-adventure").then((adventure : any) => {
			this.adventure = adventure
			this.cache.get('settlersprime-soldiers').then((soldiers : Array<any>) => 
					this.cache.get('settlersprime-specialists').then((specialists : Array<any>) => 
						this.gs.load(this.params.adventure, specialists, soldiers).then(() => { this.progress.unset() })))
		})
	}

	selectGuide(guide){
		this.cache.set('settlersprime-guide', guide)
		this.router.pass("sectors", {adventure: this.params.adventure, guide: guide.code, pass: "guide"})
	}

	go(item){
  	this.router.pass(item.page, {adventure: this.params.adventure, pass: item.pass})
  }

	toggleZoom(){
		this.zoomed = !this.zoomed
	}

}