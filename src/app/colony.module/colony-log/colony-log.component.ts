import { Component, OnInit } 	from '@angular/core';

import { CacheService } 			from '../../services/cache.service';
import { ProgressService } 		from '../../services/progress.service';
import { RoutingService } 		from '../../services/routing.service';

import { ColonyService }      from '../colony.service';

@Component({
  selector: 'app-colony-log',
  templateUrl: './colony-log.component.html',
  styleUrls: ['./colony-log.component.scss']
})
export class ColonyLogComponent implements OnInit {

	current = {
		display: 'attacks',
		round: { attacks: null,	casualties: null,	num: 0 }
	}

	constructor(public progress: ProgressService,

							private cache: CacheService,    
							private router: RoutingService,

							public cns: ColonyService) { }

	ngOnInit() {
		this.current.round.num = 0

		// load data
		this.progress.set("Analyzing attacks...")
		this.cache.get("settlersprime-battle-log").then(log => {
			this.cns.log = log
			this.updateRound()
			this.progress.unset()
		})
	}

	// spinner methods

	previousRound(){
		this.current.round.num -= 1
		this.updateRound()
	}

	nextRound(){
		this.current.round.num += 1
		this.updateRound()
	}

	display(code){
		this.current.display = code
	}

	updateRound(){
		this.current.round.attacks = this.cns.log.rounds[this.current.round.num].attacks
		this.current.round.casualties = this.cns.log.rounds[this.current.round.num].dead.soldiers
	}
}
