import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../adventures.service';
import { BattleService } from '../../services/battle.service';
import { CampService } from '../../services/camp.service';
import { SectorService } from '../../services/sector.service';

@Component({
	selector: 'app-camps',
	templateUrl: './camps.component.html',
	styleUrls: ['./camps.component.scss']
})
export class CampsComponent implements OnInit {
	params
	zoomed = false

	constructor(public progress: ProgressService,

		private backend: BackendService,
		private cache: CacheService,
		private router: RoutingService,
		private route: ActivatedRoute,

		public ads: AdventuresService,
		public bs: BattleService,
		public cs: CampService,
		public ss: SectorService) { this.route.params.subscribe( params => this.params = params ) }

	ngOnInit() {
		this.bs.clean()
		this.cache.remove('settlersprime-battle-camp')

		console.log(this.ads.adventure)
		console.log(this.ss.sectors)

		if(!this.ads.adventure){
			console.log("wha?")
			this.progress.set('Looking for trouble...')
			this.ads.select(this.params.id).then(() => {
				this.progress.unset()
			})
		}
	}

	selectCamp(sector, camp){
		this.bs.selectCamp(camp)
		this.cache.set('settlersprime-battle-camp', {sector: sector, camp: camp})
		this.router.go(["battle", "enemies"])
	}

	goToGuides(){
		this.router.go(["adventures", this.params.id, "guides"])
	}

	toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
