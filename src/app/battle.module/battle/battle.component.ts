import { Component, OnInit } 	from '@angular/core';

import { CacheService } 			from '../../services/cache.service';
import { ProgressService } 		from '../../services/progress.service';
import { RoutingService } 		from '../../services/routing.service';

import { BattleService } 			from '../battle.service';
import { UserService } 				from '../../services/user.service';

import { menu } 							from './battle.menu';

@Component({
	selector: 'app-battle',
	templateUrl: './battle.component.html',
	styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
	menu = menu

	constructor(public progress: ProgressService,

					    private cache: CacheService,
					    private router: RoutingService,

					    private bs: BattleService,
					    public user: UserService) { }

	ngOnInit() {
		// clear cache
		this.cache.remove("settlersprime-battle-general")
		this.cache.remove("settlersprime-battle-units")
	}

	select(item){
		this.cache.set("settlersprime-battle-mode", item.mode)

		if(item.adventure){
			this.cache.set("settlersprime-adventure", {code: item.adventure})
			this.router.pass("sectors", {adventure: item.adventure, pass: "camps"})
		}
		else if(item.mode == "adventure")
			this.router.go("adventures", {battle: true})
		else
			this.router.go("enemies", {colony: true})
  }
}