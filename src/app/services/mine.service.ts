import { Injectable } from '@angular/core';

import { BackendService, Mine } from './backend/backend.service';
import { CacheService } from './cache.service';
import { ResourceService } from './resource.service';

@Injectable()
export class MineService {
	mines = []

	constructor(private backend: BackendService,
		private cache: CacheService,
		private rs: ResourceService) {}

	public loadCache(){
		return new Promise((resolve, reject) => 
			this.cache.get('settlersprime-mines').then((mines : Array<Mine>) => {
				if(mines)
					this.mines = mines
			}))
	}

	public loadSector(scode){
		return new Promise((resolve, reject) => {
			this.backend.getItems('mines', {sector: scode}).then((mines: Array<Mine>) => {
				mines.forEach(m => {
					let i = this.mines.findIndex(mn => mn.resource.code == m.resource)
					if(i != -1) {
						this.mines[i].list.push(m)
						this.mines[i].sectorList[scode] ? this.mines[i].sectorList[scode] += 1 : this.mines[i].sectorList[scode] = 1
					}
					else {
						let sList = {}
						sList[scode] = 1
						let res = this.rs.resources.find(r => r.code == m.resource)
						this.mines.push({
							list: [m],
							resource: {code: res.code, icon: res.icon, name: res.name},
							sectorList: sList
						})
					}
				})
				resolve()
			})
		})
	}
}