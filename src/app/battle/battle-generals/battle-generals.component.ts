import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { RoutingService } from '../../services/routing.service';

import { BattleService } from '../../services/battle.service';
import { SpecialistService } from '../../services/specialist.service';

@Component({
	selector: 'app-battle-generals',
	templateUrl: './battle-generals.component.html',
	styleUrls: ['./battle-generals.component.scss']
})
export class BattleGeneralsComponent implements OnInit {
	units
	general

	constructor(private backend: BackendService,
		private cache: CacheService,
		private router: RoutingService,

		public bs: BattleService,
		public sps: SpecialistService) { }

	ngOnInit() {
		this.sps.loadIfEmpty().then(() => 
			this.cache.get("settlersprime-battle-general").then((general : any) => {
				this.units = this.sps.getGenerals()
				this.general = general ? general : "normalgeneral"
			}))
	}

	next(){
		this.bs.selectGeneral(this.general)
		this.cache.set('settlersprime-battle-general', this.general)
		this.router.go(["battle", "preview"])
	}

	select(general){
		this.general = general
	}
}
