import { Injectable } from '@angular/core';

import { BackendService } from './backend/backend.service';

import { AdventureService } from './adventure.service';
import { CampService } from './camp.service';
import { SpecialistService } from './specialist.service';

@Injectable()
export class BattleService {
  enemies
  general = null
  log = null
  mode = null
  soldiers = null
  soldiersCategory = "normal"

  constructor(private backend: BackendService,
    public ads: AdventureService,
    public cs: CampService,
    public sps: SpecialistService) { }

  public selectAdventure(acode){
    return new Promise((resolve, reject) => {
      this.ads.select(acode).then(() => {
        this.selectMode("adventure")
        resolve()
      })
    })
  }

  public selectCamp(camp){
    this.enemies = this.cs.camps.find(c => c.code == camp).enemies
  }

  public selectGeneral(spcode){
    this.general = this.sps.get(spcode)
  }

  public selectMode(mode){
    this.mode = mode

    this.general = null
    if(mode == "adventure")
      this.selectGeneral("normalgeneral")
    else
      this.selectGeneral("marshal")
  }

  public simulateBattle(){
    return new Promise((resolve, reject) => {
      let params = {
        adventure: this.mode == "adventure" ? this.ads.adventure.code : null,
        enemies: this.enemies
        .filter(e => e.amount > 0)
        .map(e => e.code + '_' + e.amount)
        .join(','),
        general: this.general.code,
        soldiers: this.soldiers ? this.soldiers
        .filter(s => s.amount > 0)
        .map(s => s.code + '_' + s.amount)
        .join(',') : null
      }
      if(this.mode == "adventure")
        this.backend.simulateBattle(params).then((log : Array<any>) => {
          this.log = log
          resolve(log)
        })
      else{
        this.backend.simulateColonyBattle(params).then((log : Array<any>) => {
          this.log = log
          resolve(log)
        })
      }
    })
  }

  public clean(){
    this.soldiers = null
    this.enemies = null
  }

  public toggleSoldiersCategory(){
    this.soldiersCategory = this.soldiersCategory == "normal" ? "elite" : "normal"
  }
}