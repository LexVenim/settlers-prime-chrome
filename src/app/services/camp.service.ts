import { Injectable } from '@angular/core';

import { BackendService, Camp, GuideCamp } from './backend/backend.service';
import { CacheService } from './cache.service';

import { EnemyService } from './enemy.service';
import { SoldierService } from './soldier.service';

@Injectable()
export class CampService {
	camps = []

	constructor(private backend: BackendService,
		private cache: CacheService,

		public es: EnemyService,
		public sls: SoldierService) {}

	public loadCache(){
		return new Promise((resolve, reject) => 
			this.cache.get('settlersprime-camps').then((camps : Array<Camp>) => {
				if(camps)
					this.camps = camps.sort((a,b) => a.code > b.code ? 1 : (a.code < b.code ? -1 : 0))
			}))
	}

	public loadSector(scode){	
		return new Promise((resolve, reject) => {
			this.backend.getItems('camps', {sector: scode}).then((camps: Array<Camp>) => {
				let temp = camps.map(c => {
					c.enemies = c.enemies.map(e => {
						let enemy = this.es.enemies.find(ese => ese.code == e.code)
						e.icon = enemy.icon
						e.name = enemy.name
						e.order = enemy.order
						return e
					}).sort((a,b) => a.order - b.order)

					return c
				})

				temp.forEach(tc => {
					if(this.camps.findIndex(c => c.code == tc.code) == -1)
						this.camps.push(tc)
				})

				this.camps = this.camps.sort((a,b) => a.code > b.code ? 1 : (a.code < b.code ? -1 : 0))

				resolve()
			})
		})
	}

	public loadGuideCamps(guide){
		return new Promise((resolve, reject) => {
			this.backend.getItems('guide_camps', {guide: guide.code}).then((guide_camps: Array<GuideCamp>) => {
				let guideCamps = guide_camps.map(gc => {
					
					gc.casualties = gc.casualties.map(cas => {
						let soldier = this.sls.soldiers.find(s => s.code == cas.code)
						cas.icon = soldier.icon
						cas.name = soldier.name
						cas.order = soldier.order
						return cas
					}).sort((a,b) => a.order - b.order)

					gc.waves = gc.waves.map(wave => {
						wave.general = guide.generals.find(g => g.code == wave.general)

						wave.units = wave.units.map(un => {
							let soldier = this.sls.soldiers.find(s => s.code == un.code)
							un.icon = soldier.icon
							un.name = soldier.name
							un.order = soldier.order
							return un
						}).sort((a,b) => a.order - b.order)

						return wave
					})

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


