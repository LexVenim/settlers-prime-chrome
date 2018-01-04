import { Component, OnInit } from '@angular/core';

import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { BattleService } from '../../services/battle.service';

@Component({
	selector: 'app-battle-result',
	templateUrl: './battle-result.component.html',
	styleUrls: ['./battle-result.component.scss']
})
export class BattleResultComponent implements OnInit {

	constructor(public progress: ProgressService,

		private cache: CacheService,    
		private router: RoutingService,

		public battle: BattleService) { }

	ngOnInit() {
		this.progress.set("Making a report...")
		if(!this.battle.log || this.battle.soldiers.length == 0)
			this.cache.get('settlersprime-battle-log').then(log => {
				this.battle.log = log
				this.cache.get('settlersprime-battle-units').then((units : any) => {
					if(this.battle.soldiers.length == 0)
						this.battle.soldiers = units.soldiers
					this.progress.unset()
				})
			})
		else
			this.progress.unset()
	}

	showLog(){
		this.router.go(["battle", "log"])
	}

}
