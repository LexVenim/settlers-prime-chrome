import { Injectable } 			from '@angular/core';

import { BackendService } 	from '../services/backend/backend.service';

@Injectable()
export class BattleService {
  adventure
  enemies
  general
  log
  mode
  soldiers

  private _units
  set units(u){  
    this._units = {
      enemies: u.enemies.filter(e => e.amount > 0).map(e => e.code + '_' + e.amount).join(','),
      soldiers: u.soldiers.filter(s => s.amount > 0).map(s => s.code + '_' + s.amount).join(',')
    }
    this.enemies = u.enemies
    this.soldiers = u.soldiers
  }

  constructor(private backend: BackendService) { }

  public simulate(){
    return new Promise((resolve, reject) => {
      let params = {
        adventure: this.adventure ? this.adventure.code : undefined,
        enemies: this._units.enemies,
        general: this.general ? this.general.code : undefined,
        soldiers: this._units.soldiers
      }
      if(this.mode == "adventure")
        this.backend.simulateBattle(params).then((log : Array<any>) => {this.log = log; resolve(log)})
      else{
        this.backend.simulateColonyBattle(params).then((log : Array<any>) => {this.log = log; resolve(log)})
      }
    })
  }

  public clean(){
  	this.adventure = undefined
  	this.general = undefined
  	this.log = undefined
  	this.mode = undefined
  	this._units = undefined

  	this.enemies = this.soldiers = undefined
  }
}