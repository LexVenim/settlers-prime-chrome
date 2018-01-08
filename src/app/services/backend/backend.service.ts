import { Injectable } from '@angular/core';
import { AsyncHttpManager } from './async_http.manager';

export interface Adventure {
	category: string
	code: string
	difficulty?: number
	icon: string
	level?: number
	name: string
	players?: number
	time?: number
	xp?: number
}

export interface Buff {
	buildings?: any
	category: string
	code: string
	cost?: any
	duration?: number
	gem?: number
	icon: string
	name: string
	x?: number

	list?: Array<any>
}

//  Buildings

export interface Building {
	category: string
	code: string	
	icon: string
	name: string

	abilities?: any
	capacity?: any
	cost?: any
	level?: number
	limit?: number
	mine?: boolean
	production?: any
	speed?: any
	time?: number

	list?: Array<UserBuilding>
	sectorList?: any
}

export interface UserBuilding{
	id?: string
	buffed?: boolean
	capacity?: any
	code?: string
	cost?: any
	level: number
	production?: any
	scode: string
}

// Camps

export interface Camp {
	code: string
	enemies: any
	icon: string
	leader: boolean
	sector: string
}

//  Units

export interface Damage {
	min: number
	max: number
}

export interface Enemy {
	abilities?: UnitAbilities
	accuracy: number
	category: string
	code: string
	damage: Damage
	hp: number
	icon: string
	name: string
	order?: any
}

export interface ExpBonus {
	amount: number
	category: string
}

export interface ExpEnemy {
	bonus?: ExpBonus
	category: string
	code: string
	damage: number
	hp: number
	icon: string
	name: string
}

export interface ExpSoldier {
	bonus?: ExpBonus
	build?: UnitBuild
	category: string
	code: string
	damage: number
	heavy: boolean
	hp: number
	icon: string
	name: string
	requiredlevel: number
}

export interface Soldier {
	abilities?: UnitAbilities
	accuracy: number
	build?: UnitBuild
	category: string
	code: string
	damage: Damage
	hp: number
	icon: string
	name: string
	order: number
	requiredlevel: number
}

export interface UnitAbilities {
	actower?: boolean
	bonusbuildingdamage?: boolean
	first?: boolean
	ignoreactower?: boolean
	last?: boolean
	splash?: boolean
	weak?: boolean
}

export interface UnitBuild {
	buildingtime: number
	cost: any
}

// Guides

export interface Guide {
	code: string
	casualties: Array<GuideUnit>
	generals: Array<GuideUnit>
	units: Array<GuideUnit>
	name: string
	camps?: Array<GuideCamp>
}

export interface GuideCamp {
	casualties: Array<GuideUnit>
	campcode: string
	code: string
	enemies?: Array<GuideUnit>
	num?: number
	order: number
	waves: Array<GuideWave>
}

export interface GuideUnit {
	amount: number
	code: string
	icon?: string
	name?: string
	order?: number
}

export interface GuideWave {
	general: GuideUnit
	units: Array<GuideUnit>
}

export interface Mine {
	amount: number
	building: Building
	code: string
	resource: Resource
	sector: Sector
}

// Resources

export interface Resource {
	building?: string
	category: string
	code: string
	icon: string
	name: string
	unique?: any

	economy?: UserResource
}

export interface UserResource {
	in: {
		amount: number
		buildings?: {
			amount: number
			list: Array<Building>
		}
	}
	out: {
		amount: number
		buildings?: {
			amount: Array<number>
			list: Array<Building>
		}
	}
}

// Sectors

export interface Sector {
	adventure: string
	camps?: Array<string>
	code: string
	locked?: boolean
	name?: string
	order?: number
}

// Specialists

export interface Skill {
	code: string
	icon: string
	info?: any
	level: number
	name: string
	rank: number
	specialist: SpecialistCategory
	trait: string
}

export interface Specialist {
	abilities?: SpecialistAbilities
	category: SpecialistCategory
	code: string
	icon: string
	name: string
	order?: number
	tavern?: any
}

export interface SpecialistAbilities {
	accuracy?: number
	bonusbuffs?: boolean
	bonusdeposit?: boolean
	bonusreward?: boolean
	cantfight?: boolean
	damage?: Damage
	dazzle?: boolean
	explosive?: boolean
	fasttravel?: boolean
	fastrecover?: boolean
	first?: boolean
	garrisonicon?: string
	hp?: number
	interceptdefense?: number
	maxunits?: number
	speed?: number
	splash?: boolean
	traveltime?: any
	weak?: boolean
	weakdefense?: boolean
}

export interface SpecialistCategory {
	code: string
	name: string
}

export interface Task {
	code: string
	name: string
	requiredlevel: number
	specialist: SpecialistCategory
	time: number
}

@Injectable()
export class BackendService {
	backendUrl = 'https://settlers-prime-api.herokuapp.com'

	constructor(private asyncHttp: AsyncHttpManager) {}

	// items methods

	private loadItems(icode, params = null)
	{
		let url = this.backendUrl + '/' + icode + '.json' + (params ? ("?" + this.format(params)) : "")
		return new Promise((resolve, reject) => {
			this.asyncHttp.load(url).then(items => {
				resolve(items)
			})
		})
	}

	private loadItem(icode, code, params = null){
		return new Promise((resolve, reject) => {
			let url = this.backendUrl + '/' + icode + '/' + code + '.json' + (params ? ("?" + this.format(params)) : "")
			this.asyncHttp.load(url).then(item => {
				resolve(item)
			})
		})
	}

	public getItems(icode, params = null){
		return new Promise((resolve, reject) => {
			this.loadItems(icode, params).then((items: Array<any>) => {
				if(!params || !params.categorize)
					items.forEach(i => {
						this.findCachedItem(icode, i.code).then(res => {
							if(!res &&(!params || !params.dontCache)){
								this.cacheItem(icode, i.code, i)
								// console.log("Cached " + i.code + ' in ' + icode)
							}
							// else
								// console.log("Already have " + i.code + ' in ' + icode)
						})
					})
				resolve(items)
			})
		})
	}

	public getItem(icode, code, params = null){
		return new Promise((resolve, reject) => {
			this.findCachedItem(icode, code).then((res: any) => {
				if(!res || !res.full){
					this.loadItem(icode, code, params).then((item: any) => {
						if(item.code)
							item.full = true
						this.cacheItem(icode, code, item)
						// console.log("Cached " + code + ' in ' + icode)
						resolve(item)
					})
				}
				else{
					// console.log("Already have " + code + ' in ' + icode)
					resolve(res)
				}
			})
		})
	}

	private findCachedItem(icode, code){
		return new Promise((resolve, reject) => {
			let label = 'settlersprime-' + icode + '-' + code
			chrome.storage.local.get([label], (function(item) {
				item[label] ? resolve(item[label]) : resolve(null)
			}))
		})
	}

	private cacheItem(icode, code, item){
		let label = 'settlersprime-' + icode + '-' + code

		chrome.storage.local.set({[label]: item}, function() {
			// console.log("Saved " + code + ' in ' + icode);
		});
	}

	// battle methods

	public simulateBattle(params){
		return new Promise((resolve, reject) => {
			this.loadBattle('battle', params).then(log => resolve(log))
		})
	}

	public simulateColonyBattle(params){
		return new Promise((resolve, reject) => {
			this.loadBattle('colony', params).then(log => resolve(log))
		})
	}

	private loadBattle(code, params){
		let url = this.backendUrl + '/' + code + '.json?' + this.format(params)
		// console.log(url)
		return new Promise((resolve, reject) => {
			this.asyncHttp.load(url).then(log => {
				resolve(log)
			})
		})
	}

	// params

	private format(params){
		return Object.keys(params)
		.map(k => {
			let p = Array.isArray(params[k]) ? params[k].join(',') : params[k]
			return k + '=' + p
		})
		.join('&')
	}

}