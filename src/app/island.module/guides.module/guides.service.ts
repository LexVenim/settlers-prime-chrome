import { Injectable } 						from '@angular/core';

import { BackendService, Guide } 	from '../../services/backend/backend.service';
import { GuideUnitNamesService } 	from './guide.unitnames.service';

@Injectable()
export class GuidesService {
	guides
	guide

	constructor(private backend: BackendService,
							private guns: GuideUnitNamesService) {}

	public load(acode, generals, soldiers){
		return new Promise((resolve, reject) => {
			this.backend.getItems('guides', {adventure: acode}).then((guides: Array<Guide>) => {
				
				this.guides = guides.map(guide => {
					guide.generals = guide.generals.map(gen => {
						let general = generals.find(g => g.code == gen.code)
						gen.icon = general.icon
						gen.name = general.name
						gen.order = general.order
						return gen
					}).sort((a,b) => a.order - b.order).reverse()

					guide.casualties = guide.casualties.map(cas => {
						let soldier = soldiers.find(s => s.code == cas.code)
						cas.icon = soldier.icon
						cas.name = soldier.name
						cas.order = soldier.order
						return cas
					}).sort((a,b) => a.order - b.order)

					guide.units = guide.units.map(un => {
						let soldier = soldiers.find(s => s.code == un.code)
						un.icon = soldier.icon
						un.name = soldier.name
						un.order = soldier.order
						return un
					}).sort((a,b) => a.order - b.order)

					let generalName = this.guns.getGeneralName(guide.generals[0].code)
					let soldierName = this.guns.getSoldierName(guide.units[guide.units.length -1])
					guide.name = generalName + " with " + soldierName

					return guide
				}).sort((a,b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0))

				resolve()
			})
		})
	}
}