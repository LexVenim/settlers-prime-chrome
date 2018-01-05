import { Injectable } 											from '@angular/core';

import { BackendService, Enemy, ExpEnemy } 	from '../../services/backend/backend.service';

@Injectable()
export class EnemiesService {
	enemies = []

	constructor(private backend: BackendService) {}

	public getAdventureEnemies(adventure){
		return new Promise((resolve, reject) => {
			this.backend.getItem("enemy_orders", adventure).then((enemy_orders: any) => {	
				let promises = []

				for (var key in enemy_orders) {
					promises.push(new Promise((resolve, reject) => {
						this.backend.getItem("enemies", key).then((enemy: Enemy) => {
							enemy.order = enemy_orders[enemy.code]
							resolve(enemy)
						})
					}))
				}

				Promise.all(promises).then(enemies => {
					this.enemies = enemies.sort((a,b) => a.order - b.order)
					resolve(this.enemies)
				})
			})
		})
	}

	public getColonyEnemies(){
		return new Promise((resolve, reject) => 
			this.backend.getItems("exp_enemies").then(enemies => resolve(enemies)))
	}
}