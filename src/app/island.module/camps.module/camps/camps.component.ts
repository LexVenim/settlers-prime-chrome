import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { CampsService }    			from '../camps.service';

import { SectorFilterPipe }  		from '../../../pipes/sector.filter.pipe';

import { menu }                 from './camps.menu';

@Component({
	selector: 'app-camps',
	templateUrl: './camps.component.html',
	styleUrls: ['./camps.component.scss']
})
export class CampsComponent implements OnInit {
	adventure
	menu = menu
	params
	sectors
	zoomed = false

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public cs: CampsService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
		// clear cache
		this.cache.remove('settlersprime-battle-camp')
		this.cache.remove('settlersprime-battle-units')
		this.cache.remove('settlersprime-battle-general')
		// load data
		if(this.params.pass == "guide") {
			this.progress.set("Planning attacks...")
			this.loadCamps().then((camps : Array<any>) => 
				this.cache.get('settlersprime-soldiers').then((soldiers : Array<any>) => 
					this.cache.get('settlersprime-specialists').then((specialists : Array<any>) => 
						this.cs.loadGuideCamps(this.params.guide, specialists, soldiers).then((guideCamps) => {
							this.cache.set("settlersprime-guide-camps", guideCamps)
							this.router.go("guides", this.params.guide, {adventure: this.params.adventure})
						}))))
		} else {
			this.cache.get("settlersprime-adventure").then((adventure : any) => {
				this.adventure = adventure
				this.loadCamps().then(() => this.progress.unset())
			})
		}
	}

	loadCamps(){
		return new Promise((resolve, reject) => {
			this.cache.get('settlersprime-enemies').then((enemies : Array<any>) => 
				this.cache.get("settlersprime-sectors").then((sectors : Array<any>) => {
					this.sectors = sectors || []
					this.cs.loadAdventureCamps(sectors.map(s => s.code), enemies).then((camps) => {
						this.cache.set("settlersprime-camps", camps)
						resolve()
					})
				}))
		})
	}

	selectCamp(camp){
		this.cache.set("settlersprime-battle-camp", camp)
		this.router.go("enemies")
	}

	selectCustom(){
		this.router.go("enemies")
	}

	go(item){
  	this.router.pass(item.page, {adventure: this.params.adventure, pass: item.pass})
  }

	toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
