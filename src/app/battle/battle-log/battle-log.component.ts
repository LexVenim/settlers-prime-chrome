import { Component, OnInit } from '@angular/core';

import { BattleService } from '../../services/battle.service';
import { RoutingService } from '../../services/routing.service';


@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.scss']
})
export class BattleLogComponent implements OnInit {

	current = {
		round: 0,
		phases: {
			list: [],
			num: 0
		},
		tabs: {
			list: [],
			num: 0
		}
	}

	constructor(public battle: BattleService,
		private router: RoutingService) { }

	ngOnInit() {
		this.loadPhase()
	}

	previousRound(){
		this.current.round -= 1
		this.loadPhase()
	}

	nextRound(){
		this.current.round += 1
		this.loadPhase()
	}

	previousPhase(){
		this.current.phases.num -= 1
		this.loadTabs()
	}

	nextPhase(){
		this.current.phases.num += 1
		this.loadTabs()
	}

	previousTab(){
		this.current.tabs.num -= 1
	}

	nextTab(){
		this.current.tabs.num += 1
	}

	loadPhase()
	{
		this.current.phases.num = 0
		this.current.phases.list = this.battle.log[this.current.round].attacks
		.map((phase, i)=> {return {
			name: ["First Strike", "Main Strike", "Last Strike"][i],
			num: i,
			exist: phase.enemies.length > 0 || phase.general || phase.soldiers.length > 0
		}})
		.filter(a => a.exist)

		this.current.phases.list.push({
			name: "Casualties",
			num: -1
		})

		this.loadTabs()
	}

	loadTabs(){
		let phase = this.current.phases.list[this.current.phases.num]
		let tabs = []

		if(phase.num != -1)
		{
			let attacks = this.battle.log[this.current.round].attacks[phase.num]

			if(attacks.enemies.length > 0)
				tabs.push({name: "Enemies", attacks: attacks.enemies})

			if(attacks.soldiers.length > 0)
				tabs.push({name: "Soldiers", attacks: attacks.soldiers})

			if(attacks.general)
				tabs.push({name: "General", attacks: [attacks.general]})
		}
		else {
			tabs.push({
				casualties: this.battle.log[this.current.round].casualties,
				name: "Total"
			})
		}

		this.current.tabs = {
			list: tabs,
			num: 0
		}
	}
}
