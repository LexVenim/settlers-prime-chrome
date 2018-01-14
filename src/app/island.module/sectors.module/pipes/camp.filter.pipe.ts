import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'campfilter',
	pure: false
})
export class CampFilterPipe implements PipeTransform {

	transform(items: any[], sector: any): any {
		if (!items || !sector) {
			return items;
		}
		return items.filter(item => item.sector == sector);
	}
}