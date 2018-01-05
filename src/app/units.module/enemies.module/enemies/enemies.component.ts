import { Component, OnInit } 		from '@angular/core';

import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { EnemiesService }    		from '../enemies.service';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.scss']
})
export class EnemiesComponent implements OnInit {
	params
	units

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public es: EnemiesService) { this.route.params.subscribe( params => this.params = params ) }

	ngOnInit() {
		if(this.params.pass) {
			this.progress.set("Estimating enemy forces...")
			this.es.getAdventureEnemies(this.params.adventure).then((enemies : Array<any>) => {
				this.cache.set("settlersprime-enemies", enemies)
				switch (this.params.pass) {
					case "camps":
						this.router.go(this.params.pass, {adventure: this.params.adventure});	break;
					case "guide":
						this.router.pass("camps", this.params);	break;
					default:
						this.router.go(this.params.pass, {adventure: this.params.adventure});	break;
				}		
			})
		}
		else {
			this.progress.set("Estimating enemy forces...")
			this.cache.get("settlersprime-battle-units").then((units : any) => {
				if(units) {
					this.units = units.enemies
					this.progress.unset()
				}
				else {
					if(this.params.colony){
						this.es.getColonyEnemies().then((enemies : Array<any>) => this.units = enemies.map(e => {e.amount = 0; return e }))
						this.progress.unset()
					}
					else {
						this.cache.get('settlersprime-battle-camp').then((camp : any) => 
							this.cache.get('settlersprime-enemies').then((enemies : Array<any>) => {
								this.units = enemies.map(e => {
									let enemy = camp.enemies.find(ce => ce.code == e.code)
									e.amount = enemy ? enemy.amount : 0;
									return e
								})
								this.progress.unset()
							}))
					}
				}
			})
		}
	}

	empty(){
		return this.units.filter(u => u.amount != 0).length == 0
	}

	next(){
		if(!this.empty()) {
			if(this.params.colony) {
				this.cache.set('settlersprime-battle-units', {enemies: this.units, soldiers: []})
				this.router.go("battle", "preview")
			}
			else
				this.cache.get("settlersprime-battle-units").then((units : any) => {
					this.cache.set('settlersprime-battle-units', {enemies: this.units, soldiers: units ? units.soldiers : [] })
					this.router.go("soldiers")
				})
		}
	}
}
