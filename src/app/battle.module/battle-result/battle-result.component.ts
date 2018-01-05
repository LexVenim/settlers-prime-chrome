import { Component, OnInit }   from '@angular/core';

import { CacheService }        from '../../services/cache.service';
import { ProgressService }     from '../../services/progress.service';
import { RoutingService }      from '../../services/routing.service';

import { BattleService }       from '../battle.service';

@Component({
	selector: 'app-battle-result',
	templateUrl: './battle-result.component.html',
	styleUrls: ['./battle-result.component.scss']
})
export class BattleResultComponent implements OnInit {

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,

              public bs: BattleService) { }

	ngOnInit() {
		// load data
		this.progress.set("Making a report...")
		this.cache.get("settlersprime-battle-log").then(log => {
			this.bs.log = log
			this.progress.set("Treating wounds...")
			this.cache.get("settlersprime-battle-units").then(units => {
				this.bs.units = units
				this.progress.unset()
			})
		})
	}

	showLog(){
		this.router.go("battle", "log")
	}

}
