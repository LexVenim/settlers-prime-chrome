import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'buildingsfilter',
	pure: false
})
export class BuildingsFilterPipe implements PipeTransform {

	transform(items: any[], sector: any, building: any): any {
		if (!items || !sector || !building) {
			return items;
		}
		return items.filter(item => (item.scode == sector) && (item.code == building));
	}
}