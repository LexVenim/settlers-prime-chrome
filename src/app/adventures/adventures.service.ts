import { Injectable } from '@angular/core';

import { BackendService, Adventure } from '../services/backend/backend.service';
import { ProgressService } from '../services/progress.service';

import { EnemyService } from '../services/enemy.service';
import { GuideService } from '../services/guide.service';
import { SectorService } from '../services/sector.service';
import { SoldierService } from '../services/soldier.service';
import { SpecialistService } from '../services/specialist.service';

@Injectable()
export class AdventuresService {
	adventures
	adventure

	constructor(public progress: ProgressService,

		private backend: BackendService,

		public es: EnemyService,
		public gs: GuideService,
		public ss: SectorService,
		public sps: SpecialistService,
		public sls: SoldierService) {}

	public load(){
		return new Promise((resolve, reject) => {
			this.backend.getItems('adventures').then((adventures : Array<Adventure>) => {
				this.adventures = adventures
				resolve()
			})
		})
	}

	public loadAdventureCategories(){
		return new Promise((resolve, reject) => {
			this.backend.getItems('adventures', {categorize: true}).then((adventures : Array<Adventure>) => {
				this.adventures = adventures
				resolve()
			})
		})
	}

	public select(aCode){
		return new Promise((resolve, reject) => {
			this.backend.getItem('adventures', aCode).then((adventure : Adventure) => {
				this.adventure = adventure
				
				this.progress.set('Estimating enemy forces...')
				this.es.load(aCode).then(() => {
					this.progress.set('Gathering up troops...')
					this.sls.loadIfEmpty().then(() => {
						this.progress.set('Hiring specialists...')
						this.sps.loadGeneralsIfEmpty().then(() => {
							this.progress.set('Mapping the camps...')
							this.ss.loadAdventure(aCode).then(() => {
								this.progress.set('Looking for guidance...')
								this.gs.load(aCode).then(() => {
									this.progress.unset()
									resolve()
								})
							})
						})
					})
				})
			})
		})
	}

	public selectIfDiffirent(aCode){
		return new Promise((resolve, reject) => {
			if(!this.adventure || this.adventure.code != aCode){
				this.progress.set('Looking for trouble...')
				this.select(aCode).then(() => {
					this.progress.unset()
					resolve()
				})
			}
			else
				resolve()
		})
	}
}

