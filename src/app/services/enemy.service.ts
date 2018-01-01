import { Injectable } from '@angular/core';

import { BackendService, Enemy } from './backend/backend.service';
import { CacheService } from './cache.service';

@Injectable()
export class EnemyService {
	enemies = []

	constructor(private backend: BackendService,
		private cache: CacheService) {}

	public load(acode){
		return new Promise((resolve, reject) => {
			this.backend.getItem('enemy_orders', acode).then((enemy_orders: any) => {	
				let promises = []

				for (var key in enemy_orders) {
					promises.push(
						new Promise((resolve, reject) => {
							let i = this.enemies.findIndex(e => e.code == key)
							if(i != -1){
								this.enemies[i].order[acode] = enemy_orders[key]
								resolve()
							}
							else{
								this.backend.getItem('enemies', key).then((enemy: Enemy) => {
									enemy.order = {}
									enemy.order[acode] = enemy_orders[enemy.code]
									this.enemies.push(enemy)
									resolve()
								})
							}
						}))
				}

				Promise.all(promises).then(() => resolve())
			})
		})
	}

	public loadCache(){
		return new Promise((resolve, reject) => 
			this.cache.get('settlersprime-enemies').then((enemies : Array<Enemy>) => {
				if(enemies){
					this.enemies = enemies
					resolve()
				}
				else
					this.load('island').then(() =>
						this.load('archipelago').then(() => {
							this.cache.set('settlersprime-enemies', this.enemies)
							resolve()
						}))
			}))
	}

}