import { Injectable } from '@angular/core';

import { BackendService, Specialist } from './backend/backend.service';
import { CacheService } from './cache.service';

@Injectable()
export class SpecialistService {
	specialists = []
	specialist

	private guideNames = [
		{code: "normalgeneral", name: "200"},
		{code:"veteran", name: "250"},
		{code:"generalmajor", name: "270"},
		{code:"battlehardenedgeneral", name: "BH"},
		{code:"generalbighelmet", name: "Helmet"},
		{code:"generalgrimreaper", name: "Reaper"},
		{code:"generallog", name: "Log"},
		{code:"masterofdefense", name: "MD"},
		{code:"masterofmartialarts", name: "MMA"},
		{code:"lorddracul", name: "Dracul"},
		{code:"championanslem", name: "Anslem"},
		{code:"championnusala", name: "Nusala"},
		{code:"championvargus", name: "Vargus"}
	]

	constructor(private backend: BackendService,
		private cache: CacheService) {}

	public load(category){
		return new Promise((resolve, reject) => {
			this.backend.getItems('specialists', {category: category}).then((specialists : Array<Specialist>) => {
				specialists.forEach(sp => {
					let i = this.specialists.findIndex(spi => spi.code == sp.code)
					i == -1 ? this.specialists.push(sp) : this.specialists[i] = sp
				})

				resolve()
			})
		})
	}

	public loadGenerals(){
		return new Promise((resolve, reject) => {
				this.backend.getItems('specialists', {category: 'general'}).then((generals : Array<Specialist>) => {
					if(!this.specialists)
						this.specialists = generals.map(g => {
							g.order = this.guideNames.findIndex(gn => gn.code == g.code)
							return g
						})
					else
						generals.forEach(g => {
							g.order = this.guideNames.findIndex(gn => gn.code == g.code)

							let i = this.specialists.findIndex(sp => sp.code == g.code)
							i == -1 ? this.specialists.push(g) : this.specialists[i] = g
						})

					resolve()
				})
		})
	}

	public loadGeneralsIfEmpty(){
		return new Promise((resolve, reject) => {
			if(this.specialists.filter(s => s.category == "general").length == 0)
				this.loadGenerals().then(() => resolve())
			else
				resolve()
		})
	}

	public loadCache(){
		return new Promise((resolve, reject) => 
			this.cache.get('settlersprime-specialists').then((specialists : Array<Specialist>) => {
				if(specialists){
					this.specialists = specialists
					resolve()
				}
				else
					this.loadGenerals().then(() => {
						this.cache.set('settlersprime-specialists', this.specialists)
						resolve()
					})
			}))
	}

	public get(spcode){
		return this.specialists.find(sp => sp.code == spcode)
	}

	public getGenerals(){
		return this.specialists.filter(g => (g.category == 'general' && (!g.abilities || !g.abilities.cantfight)))
	}

	public getGeneralGuideName(gcode){
		return this.guideNames.find(g => g.code == gcode).name
	}

}