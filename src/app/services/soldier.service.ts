import { Injectable } from '@angular/core';

import { BackendService, Soldier } from './backend/backend.service';
import { CacheService } from './cache.service';

@Injectable()
export class SoldierService {
	soldiers
	soldier

	constructor(private backend: BackendService,
		private cache: CacheService) {}

	public load(){
		return new Promise((resolve, reject) => {
			this.backend.getItems("soldiers").then((soldiers : Array<any>) => {
				this.soldiers = soldiers.sort((a,b) => a.order - b.order)
				resolve()
			})
		})
	}

	public loadCache(){
		return new Promise((resolve, reject) => 
			this.cache.get('settlersprime-soldiers').then((soldiers : Array<Soldier>) => {
				if(soldiers){
					this.soldiers = soldiers
					resolve()
				}
				else
					this.load().then(() => {
						this.cache.set('settlersprime-soldiers', this.soldiers)
						resolve()
					})
			}))
	}

	public getSoldierGuideName(scode){
		let name = this.soldiers.find(s => s.code == scode).name
		return name.slice(-3) == "man" ? name.slice(0, -3) + "men" : name + "s"
	}

}