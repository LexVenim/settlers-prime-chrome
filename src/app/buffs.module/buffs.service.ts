import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { BackendService, Buff } from '../services/backend/backend.service';

import { BuildingsService } from '../buildings.module/buildings.service';
import { UserService }           from '../services/user.service';

@Injectable()
export class BuffsService {
  buffs = []
  buff
  userBuffs = []

  constructor(private db: AngularFireDatabase,
              private backend: BackendService,

              private bs: BuildingsService,
              private user: UserService) {}

  public load(cachedBuffs = null){
    this.buffs = []
    return new Promise((resolve, reject) => {
      if(!cachedBuffs)
        this.backend.getItems('buffs').then((buffs: Array<Buff>) => {
          this.buffs = buffs
          resolve()
        })
      else {
        this.buffs = cachedBuffs
        resolve()
      }
    })
  }

  public loadUser(){
    this.db.list('/users/' + this.user.id + '/buffs').stateChanges().subscribe(event => {
      let data = event.payload.val()
      let i

      switch (event.type) {
        case "child_added":
          if(this.checkTime(data.endtime)){
            this.userBuffs.push({building: event.payload.key, code:data.code, endtime: data.endtime})

            i = this.buffs.findIndex(b => b.code == data.code)        
            this.bs.setModifier(data.building, event.payload.key, this.buffs[i].x)
          }
          else
            this.remove(event.payload.key)
          break;

        case "child_removed":
          i = this.buffs.findIndex(b => b.code == data.code)
          this.bs.removeModifier(data.building, event.payload.key, this.buffs[i].x)

          let ubi = this.userBuffs.findIndex(b => b.building == event.payload.key)
          this.userBuffs.splice(ubi)
          break;   

        default:
          break;
      }
    })
  }

  public cleanUser(){
    this.userBuffs = []
  }

  // CRUD

  public add(building, bfid){
    let buff = this.buffs.find(b => b.code == bfid)
    let data = {
      building: building.code,
      code: buff.code,
      endtime: new Date().setMinutes(new Date().getMinutes() + buff.duration)
    }
    return new Promise((resolve, reject) => {
      this.db.object('/users/' + this.user.id + '/buffs/' + building.id).set(data).then(() => resolve())
    })
  }

  public remove(bid){
    this.db.list('/users/' + this.user.id + '/buffs').remove(bid)
  }

  // public getModifier(id, code){
  //   let zoneBuffs = this.buffs.filter(b => b.gametype == "zone")
  //   .filter(b => b.buildings == null || b.buildings.findIndex(bl => bl == code) != -1)
  //   .map(b => b.x)

  //   let buildingBuff = this.buffs.find(b => b.id == id)

  //   return (zoneBuffs.length > 0 ? zoneBuffs.reduce((p, c) => p*c) : 1) * (buildingBuff ? buildingBuff.x : 1)
  // }

  private checkTime(endtime){
    return (endtime - Date.now().valueOf()) > 0 ? true : false
  }
}