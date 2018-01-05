import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

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