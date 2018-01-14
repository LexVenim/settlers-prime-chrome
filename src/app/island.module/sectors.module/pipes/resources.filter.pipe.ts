import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'resourcesfilter',
	pure: false
})
export class ResourcesFilterPipe implements PipeTransform {


	transform(items: any[], resource: any): any {
		if (!items || !resource) {
			return items;
		}
		return items.filter(item => item.code == resource);
	}
}