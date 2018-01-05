import { Injectable } 								from '@angular/core';

import { BackendService, Adventure } 	from '../../services/backend/backend.service';

@Injectable()
export class AdventuresService {
	adventures
	adventure

	constructor(private backend: BackendService) {}

	public load(){
		return new Promise((resolve, reject) => {
			this.backend.getItems("adventures").then((adventures : Array<Adventure>) => {
				this.adventures = adventures
				resolve(adventures)
			})
		})
	}

	public loadAdventureCategories(){
		return new Promise((resolve, reject) => {
			this.backend.getItems("adventures", {categorize: true}).then((adventures : Array<Adventure>) => {
				this.adventures = adventures
				resolve(adventures)
			})
		})
	}

	public get(acode){
		return new Promise((resolve, reject) => {
			this.backend.getItem("adventures",acode).then((adventure : Adventure) => {
				this.adventure = adventure
				resolve(adventure)
			})
		})
	}
}

