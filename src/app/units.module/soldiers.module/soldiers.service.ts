import { Injectable } from '@angular/core';

import { BackendService, Soldier } from '../../services/backend/backend.service';


@Injectable()
export class SoldiersService {
	soldiers = []
	soldier

	constructor(private backend: BackendService) {}

	public load(){
		return new Promise((resolve, reject) => {
			this.backend.getItems("soldiers").then((soldiers : Array<any>) => {
				this.soldiers = soldiers.sort((a,b) => a.order - b.order)
				resolve(this.soldiers)
			})
		})
	}
}