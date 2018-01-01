import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { BackendService, Buff } from './backend/backend.service';
import { CacheService } from './cache.service';

import { BuildingService } from './building.service';
import { UserService } from './user.service';

@Injectable()
export class BuffService {
  buffs

  constructor(public db: AngularFireDatabase,
    private backend: BackendService,
    private cache: CacheService,

    public bs: BuildingService,
    private user: UserService) {}

  public load(buffs = null){
    this.buffs = []

    return new Promise((resolve, reject) => {
      if(!buffs)
        this.backend.getItems('buffs').then((buffs: Array<Buff>) => {
          this.cache.set('settlersprime-buffs', buffs)
          this.buffs = buffs.map(b => {b.list = []; return b})
          resolve()
        })
      else {
        this.buffs = buffs.map(b => {b.list = []; return b})
        console.log(this.buffs.filter(b => b.category == 'production'))
        resolve()
      }
    })
  }

  public loadCache(){
    return new Promise((resolve, reject) => 
      this.cache.get('settlersprime-buffs').then(buffs => 
        this.load(buffs).then(() => resolve())))
  }

  public loadUser(){
    // this.db.list('/users/' + this.user.id + '/buffs').$ref.on("child_added", function(snapshot) {
    //   let data = snapshot.val()
    //   if(this.checkTime(data.endtime)){
    //     let i = this.buffs.findIndex(b => b.code == data.code)
    //     this.buffs[i].list.push({building: snapshot.key, endtime: data.endtime})
    //     this.bs.setModifier(data.building, snapshot.key, this.buffs[i].x)
    //   }
    //   else
    //     this.remove(snapshot.key)
    // }, this)
    
    // this.db.object('/users/' + this.user.id + '/buffs').$ref.on('child_removed', function(snapshot){
    //   let data = snapshot.val()
    //   let i = this.buffs.findIndex(b => b.code == data.code)
    //   this.buffs[i].list = this.buffs[i].list.filter(b => b.building != snapshot.key)
    //   this.bs.removeModifier(data.building, snapshot.key, this.buffs[i].x)
    // }, this)
  }

  public clearUser(){
    this.loadCache()
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