import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sectorfilter',
	pure: false
})
export class SectorFilterPipe implements PipeTransform {
	transform(items: any[], filter: any): any {
		if (!items || !filter) {
			return items;
		}

		console.log(items)
		console.log(filter)

		return items.filter(item => filter.filter(c => c.sector == item.code).length > 0);
	}
}