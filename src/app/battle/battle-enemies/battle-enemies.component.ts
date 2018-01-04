import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../services/backend/backend.service';
import { CacheService } from '../../services/cache.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../../adventures/adventures.service';
import { BattleService } from '../../services/battle.service';
import { CampService } from '../../services/camp.service';
import { EnemyService } from '../../services/enemy.service';

@Component({
	selector: 'app-battle-enemies',
	templateUrl: './battle-enemies.component.html',
	styleUrls: ['./battle-enemies.component.scss']
})
export class BattleEnemiesComponent implements OnInit {
	units

	constructor(private backend: BackendService,
		private cache: CacheService,
		private router: RoutingService,

		public ads: AdventuresService,
		public bs: BattleService,
		public cs: CampService,
		public es: EnemyService) { }

	ngOnInit() {
		this.cache.get('settlersprime-adventure').then(adventure => 
			this.ads.selectIfDiffirent(adventure).then(() =>
				this.cache.get('settlersprime-battle-units').then((units : any) => {
					let promises = []
					let camp = null

					if(!units)
						promises.push(new Promise((resolve, reject) => this.cache.get('settlersprime-battle-camp').then(camp => resolve(camp))))

					Promise.all(promises).then((camp : any) => {
						if(this.bs.enemies.length == 0)
							this.bs.enemies = units ? units.enemies : (camp[0] ? this.cs.camps.find(c => c.code == camp[0].camp).enemies : [])

						this.units = this.es.enemies.map(e => {
							let bse = this.bs.enemies.find(be => be.code == e.code)
							e.amount = bse ? bse.amount : 0;
							return e
						})
					})				
				})))
	}

	empty(){
		return this.units.filter(u => u.amount != 0).length == 0
	}

	next(){
		if(!this.empty()) {
			this.bs.enemies = this.units
			this.cache.set('settlersprime-battle-units', {enemies: this.bs.enemies, soldiers: this.bs.soldiers})
			this.router.go(["battle", "soldiers"])
		}
	}
}
