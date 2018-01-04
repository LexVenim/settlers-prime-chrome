import { Injectable } from '@angular/core';

import { BackendService, Guide } from './backend/backend.service';
import { ProgressService } from '../services/progress.service';

import { CampService } from './camp.service';
import { SpecialistService } from './specialist.service';
import { SoldierService } from './soldier.service';

@Injectable()
export class GuideService {
	guides
	guide

	constructor(public progress: ProgressService,

		private backend: BackendService,

		public cs: CampService,
		public sps: SpecialistService,
		public sls: SoldierService) {}

	public load(acode){
		return new Promise((resolve, reject) => {
			this.backend.getItems('guides', {adventure: acode}).then((guides: Array<Guide>) => {
				
				this.guides = guides.map(guide => {
					guide.generals = guide.generals.map(gen => {
						let general = this.sps.specialists.find(g => g.code == gen.code)
						if(!general){
							console.log(gen)
							console.log(this.sps.specialists)
						}
						gen.icon = general.icon
						gen.name = general.name
						gen.order = general.order
						return gen
					}).sort((a,b) => a.order - b.order).reverse()

					guide.casualties = guide.casualties.map(cas => {
						let soldier = this.sls.soldiers.find(s => s.code == cas.code)
						cas.icon = soldier.icon
						cas.name = soldier.name
						cas.order = soldier.order
						return cas
					}).sort((a,b) => a.order - b.order)

					guide.units = guide.units.map(un => {
						let soldier = this.sls.soldiers.find(s => s.code == un.code)
						un.icon = soldier.icon
						un.name = soldier.name
						un.order = soldier.order
						return un
					}).sort((a,b) => a.order - b.order)

					let generalName = this.sps.getGeneralGuideName(guide.generals[0].code)
					let soldierName = this.sls.getSoldierGuideName(guide.units[guide.units.length -1].code)
					guide.name = generalName + " with " + soldierName

					return guide
				}).sort((a,b) => a.name.localeCompare(b.name))

				resolve()
			})
		})
	}

	public select(gcode){
		return new Promise((resolve, reject) => {
			this.progress.set('Planning attacks...')
			let guide = this.guides.find(g => g.code == gcode)

			this.cs.loadGuideCamps(guide).then((guideCamps) => {
				guide.camps = guideCamps
				this.guide = guide
				resolve()
			})
		})
	}
}