import { Injectable } from '@angular/core';

@Injectable()
export class GuideUnitNamesService {

	private guideNames : Array<any> = [
		{code: "normalgeneral", 					name: "200"},
		{code:"veteran", 									name: "250"},
		{code:"generalmajor", 						name: "270"},
		{code:"battlehardenedgeneral", 		name: "BH"},
		{code:"generalbighelmet", 				name: "Helmet"},
		{code:"generalgrimreaper", 				name: "Reaper"},
		{code:"generallog", 							name: "Log"},
		{code:"masterofdefense", 					name: "MD"},
		{code:"masterofmartialarts", 			name: "MMA"},
		{code:"lorddracul", 							name: "Dracul"},
		{code:"championanslem", 					name: "Anslem"},
		{code:"championnusala", 					name: "Nusala"},
		{code:"championvargus", 					name: "Vargus"}
	]

	constructor() {}

	public getGeneralName(gcode){
		return this.guideNames.find(g => g.code == gcode).name
	}

	public getSoldierName(soldier){
		let name = soldier.name
		return name.slice(-3) == "man" ? name.slice(0, -3) + "men" : name + "s"
	}
}

