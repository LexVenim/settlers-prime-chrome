import { Injectable } from '@angular/core';

import { BackendService, Guide } from './backend/backend.service';

import { CampService } from './camp.service';
import { SpecialistService } from './specialist.service';
import { SoldierService } from './soldier.service';

@Injectable()
export class GuideService {
	guides
	guide

	constructor(private backend: BackendService,
		public cs: CampService,
		public sps: SpecialistService,
		public sls: SoldierService) {}

	public load(acode){
		return new Promise((resolve, reject) => {
			this.backend.getItems('guides', {adventure: acode}).then((guides: Array<Guide>) => {
				
				this.guides = guides.map(guide => {
					guide.generals = guide.generals.map(gen => {
						let general = this.sps.specialists.find(g => g.code == gen.code)
						gen.icon = general.icon
						gen.name = general.name
						gen.order = general.order
						return gen
					}).sort((a,b) => a.order - b.order)

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

					let generalName = this.sps.getGeneralGuideName(guide.generals[guide.generals.length -1].code)
					let soldierName = this.sls.getSoldierGuideName(guide.units[guide.units.length -1].code)
					guide.name = generalName + " with " + soldierName

					return guide
				})

				resolve()
			})
		})
	}

	public select(gcode){
		return new Promise((resolve, reject) => {
			let guide = this.guides.find(g => g.code == gcode)

			this.cs.loadGuideCamps(guide).then((guideCamps) => {
				guide.camps = guideCamps
				this.guide = guide
				resolve()
			})
		})
	}
}