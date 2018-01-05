import { Injectable } from '@angular/core';

import { BackendService, Specialist } from '../../services/backend/backend.service';

@Injectable()
export class SpecialistsService {
	specialists = []
	specialist

	constructor(private backend: BackendService) {}

	public load(category){
		return new Promise((resolve, reject) => {
			this.backend.getItems('specialists', {category: category}).then((specialists : Array<Specialist>) => {
				this.specialists = specialists
				resolve(specialists)
			})
		})
	}

	public get(spcode){
		return this.specialists.find(sp => sp.code == spcode)
	}
}