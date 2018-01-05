import { Injectable } 											from '@angular/core';

import { BackendService, Camp, GuideCamp } 	from '../../services/backend/backend.service';

@Injectable()
export class CampsService {
	camps = []

	constructor(private backend: BackendService) {}

	loadAdventureCamps(sectors : Array<any>, enemies?: Array<any>){
		return new Promise((resolve, reject) => {
			let promises = []

			sectors.forEach(s => 
				promises.push(new Promise((resolve, reject) => 
					this.backend.getItems('camps', {sector: s}).then((camps: Array<Camp>) => 
						resolve(camps.map(c => {
							if(enemies)
								c.enemies = c.enemies.map(e => {
									let enemy = enemies.find(ese => ese.code == e.code)
									e.icon = enemy.icon
									e.name = enemy.name
									e.order = enemy.order
									return e
								}).sort((a,b) => a.order - b.order)

							return c
						}).sort((a,b) => a.code > b.code ? 1 : (a.code < b.code ? -1 : 0))
						)))))

			Promise.all(promises).then(camps => {
				this.camps = camps.reduce((acc, cur) => acc.concat(cur), [])
				resolve(this.camps)
			})
		})
	}


	public loadGuideCamps(guide, generals, soldiers){
		return new Promise((resolve, reject) => {
			this.backend.getItems('guide_camps', {guide: guide}).then((guide_camps: Array<GuideCamp>) => {
				console.log(guide_camps)

				let guideCamps = guide_camps.map(gc => {
					
					gc.casualties = gc.casualties.map(cas => {
						let soldier = soldiers.find(s => s.code == cas.code)
						cas.icon = soldier.icon
						cas.name = soldier.name
						cas.order = soldier.order
						return cas
					}).sort((a,b) => a.order - b.order)

					gc.waves = gc.waves.map(wave => {
						wave.general = generals.find(g => g.code == wave.general)

						wave.units = wave.units.map(un => {
							let soldier = soldiers.find(s => s.code == un.code)
							un.icon = soldier.icon
							un.name = soldier.name
							un.order = soldier.order
							return un
						}).sort((a,b) => a.order - b.order)

						return wave
					})

					console.log(gc.campcode)
					console.log(this.camps)

					let camp = this.camps.find(c => c.code == gc.campcode)
					gc.enemies = camp.enemies
					gc.num = camp.num

					return gc
				}).sort((a,b) => a.order - b.order)

				resolve(guideCamps)
			})
		})
	}
}


