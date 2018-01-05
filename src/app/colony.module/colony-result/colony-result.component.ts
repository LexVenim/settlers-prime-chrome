import { Component, OnInit } 	from '@angular/core';

import { CacheService } 			from '../../services/cache.service';
import { ProgressService } 		from '../../services/progress.service';
import { RoutingService } 		from '../../services/routing.service';

import { ColonyService }      from '../colony.service';

@Component({
	selector: 'app-colony-result',
	templateUrl: './colony-result.component.html',
	styleUrls: ['./colony-result.component.scss']
})
export class ColonyResultComponent implements OnInit {

	constructor(public progress: ProgressService,

							private cache: CacheService,    
							private router: RoutingService,

							public cns: ColonyService) { }

	ngOnInit() {
		// load data
		this.progress.set("Making a report...")
		this.cache.get("settlersprime-battle-log").then(log => {
			this.cns.log = log
			this.progress.unset()
		})
	}

	showLog(){
		this.router.go("colony", "log")
	}


}
