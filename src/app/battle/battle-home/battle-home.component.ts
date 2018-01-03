import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../../adventures/adventures.service';
import { BattleService } from '../../services/battle.service';
import { SpecialistService } from '../../services/specialist.service';
import { UserService } from '../../services/user.service';

@Component({

  selector: 'app-battle-home',
  templateUrl: './battle-home.component.html',
  styleUrls: ['./battle-home.component.scss']
})
export class BattleHomeComponent implements OnInit {
	menu : any = [
    {page: "island", icon: "../../assets/icons/shield.png", name: "Island"},
		{page: "archipelago", icon: "../../assets/icons/tower.png", name: "Archipelago"},

		{page: "adventures", icon: "../../assets/icons/catapult.png", name: "Adventures"},
		{page: "colonies", icon: "../../assets/icons/ship.png", name: "Colonies", lock: true}
  ]

  constructor(public progress: ProgressService,

    private af: AuthService,
    private cache: CacheService,
    private router: RoutingService,

    private as: AdventuresService,
    private bs: BattleService,
		private sps: SpecialistService,
    private user: UserService) { }

  ngOnInit() {
  	this.bs.clean()

    this.cache.remove('settlersprime-battle-mode')
		this.cache.remove('settlersprime-adventure')
  }

  select(page){
    let item = this.menu.find(i => i.page == page)
    if(!item.lock){
    	switch (page) {
			case "adventures":
				this.bs.selectMode("adventure")
				this.cache.set('settlersprime-battle-mode', "adventure")
				this.router.go(["adventures", {parent: 'battle'}])
				break;

			case "archipelago":
				this.bs.selectMode("adventure")
				this.cache.set('settlersprime-adventure', "archipelago")
				this.cache.set('settlersprime-battle-mode', "adventure")
				this.router.go(["adventures", "archipelago", "camps", {parent: 'battle'}])
				break;

			case "colonies":
				this.sps.load('marshal').then(() => {
					this.bs.selectMode("colony")
					this.cache.set('settlersprime-battle-mode', "colonies")
					this.router.go(["battle", "enemies"])
				})
				break;
			
			default:
				this.bs.selectMode("adventure")
				this.cache.set('settlersprime-adventure', "island")
				this.cache.set('settlersprime-battle-mode', "adventure")
				this.router.go(["adventures", "island", "camps", {parent: 'battle'}])
				break;
		}
    }
  }

  login(){
    this.router.go(["/login"])
  }

  isLoggedIn(){
    return this.af.isLoggedIn()
  }
}