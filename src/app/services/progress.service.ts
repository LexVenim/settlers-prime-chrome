import { Injectable } from '@angular/core';

@Injectable()
export class ProgressService {
	message = null

	constructor() {}

	public set(progress){
		this.message = progress
	}

	public unset(){
		this.message = null
	}
}