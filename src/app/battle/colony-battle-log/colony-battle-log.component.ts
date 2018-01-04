import { Component, OnInit } from '@angular/core';

import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-colony-battle-log',
  templateUrl: './colony-battle-log.component.html',
  styleUrls: ['./colony-battle-log.component.scss']
})
export class ColonyBattleLogComponent implements OnInit {

	current = {
		display: 'attacks',
		round:
		{
			attacks: null,
			casualties: null,
			num: 0
		}
	}

	constructor(public progress: ProgressService,

		private cache: CacheService,    
		private router: RoutingService,

		public battle: BattleService) { }

	ngOnInit() {
		this.current.round.num = 0
		
		this.progress.set("Making a report...")
		if(!this.battle.log)
			this.cache.get('settlersprime-battle-log').then(log => {
				this.battle.log = log
				this.updateRound()
				this.progress.unset()
			})
		else{
			this.updateRound()
			this.progress.unset()
		}
	}

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
		this.current.round.attacks = this.battle.log.rounds[this.current.round.num].attacks
		this.current.round.casualties = this.battle.log.rounds[this.current.round.num].dead.soldiers
	}
}
