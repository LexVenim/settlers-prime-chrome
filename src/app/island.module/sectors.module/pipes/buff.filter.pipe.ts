import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'bufffilter',
	pure: false
})
export class BuffFilterPipe implements PipeTransform {

	transform(items: any[], building: any): any {
		if (!items || !building) {
			return items;
		}

		return items.filter(buff => {
			if(buff.category == 'production'){
				if(building == "mayorhouse")
					return (buff.buildings && buff.buildings.indexOf("mayorhouse") != -1)
				else if(building.indexOf("provisionhouse") != -1)
					return (buff.buildings && buff.buildings.indexOf("provisionhouse") != -1)
				else if(building == "combatacademy")
					return (buff.buildings && buff.buildings.indexOf("combatacademy") != -1)
				else if(building == "combatarmory")
					return (buff.buildings && buff.buildings.indexOf("combatarmory") != -1)
				else if(building == "combatacademy")
					return (buff.buildings && buff.buildings.indexOf("combatacademy") != -1)
				else if(building.indexOf("barracks") != -1)
					return (buff.buildings && buff.buildings.indexOf("barracks") != -1)
				else if(building == "bookbinder")
					return (buff.buildings && buff.buildings.indexOf("bookbinder") != -1)
				else
					return (!buff.buildings || buff.buildings.indexOf(building) != -1)
			}
			else
				return false
		});
	}
}