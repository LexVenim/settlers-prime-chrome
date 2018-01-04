import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { RoutingService } from '../../services/routing.service';

import { BattleService } from '../../services/battle.service';
import { SoldierService } from '../../services/soldier.service';

@Component({
	selector: 'app-battle-soldiers',
	templateUrl: './battle-soldiers.component.html',
	styleUrls: ['./battle-soldiers.component.scss']
})
export class BattleSoldiersComponent implements OnInit {
	units

	constructor(private backend: BackendService,
		private cache: CacheService,
		private router: RoutingService,

		public bs: BattleService,
		public ss: SoldierService) { }

	ngOnInit() {
		this.ss.loadIfEmpty().then(() => 
			this.cache.get("settlersprime-battle-units").then((units : any) => {

				if(this.bs.soldiers.length == 0){
					if(units && units.soldiers.length > 0) {
						this.bs.soldiers = units.soldiers
						
					}
					else{
						this.bs.soldiers = this.ss.soldiers.map(s => {s.amount = 0; return s})
					}
				}
				this.units = this.bs.soldiers
			}))
	}

	empty(){
		return this.units.filter(u => u.amount != 0).length == 0
	}

	next(){
		if(!this.empty()) {
			this.bs.soldiers = this.units
			this.cache.set('settlersprime-battle-units', {enemies: this.bs.enemies, soldiers: this.bs.soldiers})
			this.router.go(["battle", "generals"])
		}
	}
}
