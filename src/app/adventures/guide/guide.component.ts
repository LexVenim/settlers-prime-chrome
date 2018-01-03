import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../adventures.service';
import { BattleService } from '../../services/battle.service';
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
		public bs: BattleService,
		public gs: GuideService,
		public cs: CampService,
		public ss: SectorService) { this.route.params.subscribe( params => this.params = params ) }

	ngOnInit() {
		this.bs.clean()

		this.ads.selectIfDiffirent(this.params.id).then(() => 
			this.gs.select(this.params.gid).then(() => this.progress.unset()))	
	}

	selectCamp(camp){
		this.cache.set('settlersprime-battle-camp', {guide: this.gs.guide.code, camp: camp.replace(this.gs.guide.code + "-", "")})
		this.cache.remove('settlersprime-battle-units')
		this.cache.remove('settlersprime-battle-general')
		this.router.go(["battle", "enemies"])
	}

	goTo(page){
		this.router.go(["adventures", this.params.id, page])
	}

	toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
