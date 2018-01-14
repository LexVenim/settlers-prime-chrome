import { Pipe, PipeTransform } from '@angular/core';

import { BuildingsService }      from '../../../buildings.module/buildings.service';

@Pipe({
	name: 'btfilter',
	pure: false
})
export class BtFilterPipe implements PipeTransform {

	constructor(private bs: BuildingsService) {}

	transform(items: any[], filter: any): any {
		if (!items || !filter) {
			return items;
		}
		return items.filter(item => {
			return this.bs.userBuildings
			.filter(b => b.scode == filter)
			.filter(b => b.code == item.code)
			.length > 0
		});
	}
}