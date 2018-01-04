import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'campfilter',
	pure: false
})
export class CampFilterPipe implements PipeTransform {
	transform(items: any[], filter: any): any {
		if (!items || !filter) {
			return items;
		}

		return items.filter(item => item.code == filter.code);
	}
}

@Pipe({
	name: 'sectorfilter',
	pure: false
})
export class SectorFilterPipe implements PipeTransform {
	transform(items: any[], filter: any): any {
		if (!items || !filter) {
			return items;
		}

		return items.filter(item => filter.filter(c => c.sector == item.code).length > 0);
	}
}