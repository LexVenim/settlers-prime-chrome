import { Pipe, PipeTransform } from '@angular/core';

import { BuildingsService }      from '../../../buildings.module/buildings.service';

@Pipe({
	name: 'availablefilter',
	pure: false
})
export class AvailableFilterPipe implements PipeTransform {

	constructor(private bs: BuildingsService) {}

	transform(items: any[], sector: any): any {
		if (!items || !sector) {
			return items;
		}
		return items.filter(item => !item.limit || this.bs.userBuildings.filter(b => b.scode == sector && b.code == item.code).length < item.limit);
	}
}