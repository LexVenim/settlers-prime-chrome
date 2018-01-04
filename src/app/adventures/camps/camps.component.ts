import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../adventures.service';
import { BattleService } from '../../services/battle.service';
import { CampService } from '../../services/camp.service';
import { SectorService } from '../../services/sector.service';

import { SectorFilterPipe }  from '../../common/pipes';

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
		this.cache.remove('settlersprime-battle-units')
		this.cache.remove('settlersprime-battle-general')

		this.ads.selectIfDiffirent(this.params.id).then(() => this.progress.unset())
	}

	selectCamp(sector, camp){
		this.bs.selectCamp(camp)
		this.cache.set('settlersprime-battle-camp', {sector: sector, camp: camp})
		this.router.go(["battle", "enemies"])
	}

	goTo(page){
		this.router.go(["adventures", this.params.id, page])
	}

	selectCustom(){
		this.router.go(["battle", "enemies"])
	}

	toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
