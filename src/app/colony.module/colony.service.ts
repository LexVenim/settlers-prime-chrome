import { Injectable } from '@angular/core';

@Injectable()
export class ColonyService {
	log

  constructor() { }

  public clean(){
  	this.log = undefined
  }

}