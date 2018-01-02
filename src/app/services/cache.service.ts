import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

	private statePermissions = {
		'home': {},
		'login': {},

		'adventures': {adventures: true},
		'adventure': {adventures: true, adventure: true},
		'guides': {adventures: true, adventure: true},
		'guide': {adventures: true, adventure: true, guide: true},

		'battle': {},
		'battle_log': {battleLog: true},
		'battle_preview': {battle: true, camp: true, units: true},
		'battle_result': {battleLog: true},
		'camps': {battle: true},
		'colony_log': {battleLog: true},
		'units': {battle: true, camp: true},

		'timers': {},
		'timers_adventures': {},
		'timers_buffs': {},
		'timers_production': {},
		'timers_specialists': {},

		'economy': {},
		'buffs': {},
		'buildings': {},
		'resource': {resources: true, resource: true},
		'resources': {resources: true},
		'economy_special': {},
		'academy': {},
		'armory': {},
		'barracks': {},
		'bookbinder': {},
		'ph': {},

		'island': {island: true},
		'sector': {island: true, sector: true},

		'profile': {},
		'profile_oveview': {},
		'settings': {},
		'specialists': {}
	}

	constructor() {}

	public get(tag){
		return new Promise((resolve, reject) => {
			chrome.storage.local.get([tag], function(item) {
				resolve(item[tag])
			})
		})
	}

	public set(tag, data){
		chrome.storage.local.set({[tag]: data})
	}

	public remove(tag){
		chrome.storage.local.remove([tag])
	}

	public clear(){
		chrome.storage.local.clear()
	}
}