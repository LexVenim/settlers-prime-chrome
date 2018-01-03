import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../adventures.service';
import { GuideService } from '../../services/guide.service';
import { CampService } from '../../services/camp.service';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
	params
	zoomed = false

	constructor(public progress: ProgressService,

		private backend: BackendService,
		private cache: CacheService,
		private router: RoutingService,
		private route: ActivatedRoute,

		public ads: AdventuresService,
		public gs: GuideService,
		public cs: CampService,
		public ss: SectorService) { this.route.params.subscribe( params => this.params = params ) }

	ngOnInit() {
		this.ads.selectIfDiffirent(this.params.id).then(() => 
			this.gs.select(this.params.gid).then(() => {
				this.progress.unset()
				console.log(this.gs.guide)
			}))
			
	}

	selectCamp(sector, camp){
		this.cache.set('settlersprime-battle-camp', {sector: sector, camp: camp})
		this.router.go(["battle", "enemies"])
	}

	goTo(page){
		this.router.go(["adventures", this.params.id, page])
	}

	toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
