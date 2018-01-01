import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';

import { BackendService, Building, UserBuilding } from './backend/backend.service';
import { CacheService } from './cache.service';

// import { BuffsService } from './buffs.service';
import { UserService } from './user.service';

@Injectable()
export class BuildingService {
  private buildingsSubject = new Subject<any>()
  buildings

  private buildingModifiers = {}

  constructor(public db: AngularFireDatabase,
    private backend: BackendService,
    private cache: CacheService,

    // private buffs: BuffsService,
    private user: UserService) { }

  public buildingsUpdate() : Observable<any> {
    return this.buildingsSubject.asObservable()
  }

  public createUser(){
    return { mayorhouse: { scode: "i1", code: "mayorhouse", level: 1 } }
  }

  public load(buildings = null){
    this.buildings = []

    return new Promise((resolve, reject) => {
      if(!buildings)
        this.backend.getItems('buildings').then((buildings: Array<Building>) => {
          this.cache.set('settlersprime-buildings', buildings)
          this.buildings = buildings.map(b => {b.list = []; b.sectorList = {}; return b})
          resolve()
        })
      else {
        this.buildings = buildings.map(b => {b.list = []; b.sectorList = {}; return b})
        resolve()
      }
    })
  }

  public loadCache(){
    return new Promise((resolve, reject) => 
      this.cache.get('settlersprime-buildings').then(buildings => 
        this.load(buildings).then(() => resolve())))
  }

  public loadUser(){
    // this.db.list('/users/' + this.user.id + '/buildings').$ref.on("child_added", function(snapshot) {
    //   let data = snapshot.val()
    //   this.formatBuilding(snapshot.key, data).then(b => {
    //     let bti = this.buildings.findIndex(bt => bt.code == data.code)
    //     this.buildings[bti].list.push(b)
    //     this.buildings[bti].sectorList[data.scode] ? this.buildings[bti].sectorList[data.scode] += 1 : this.buildings[bti].sectorList[data.scode] = 1
    //     this.buildingsSubject.next(b)
    //   })
    // }, this)

    // this.db.object('/users/' + this.user.id + '/buildings').$ref.on('child_changed', function(snapshot){ 
    //   let data = snapshot.val()
    //   let bti = this.buildings.findIndex(bt => bt.code == data.code)
    //   let i = this.buildings[bti].list.findIndex(b => b.id == snapshot.key)
    //   this.formatBuilding(snapshot.key, data).then(b => {
    //     this.buildings[bti].list[i] = b
    //     this.buildingsSubject.next(b)
    //   })
    // }, this)
    
    // this.db.object('/users/' + this.user.id + '/buildings').$ref.on('child_removed', function(snapshot){
    //   let data = snapshot.val()
    //   let bti = this.buildings.findIndex(bt => bt.code == data.code)
    //   let i = this.buildings[bti].list.findIndex(b => b.id == snapshot.key)

    //   if(this.buildings[bti].sectorList[data.scode] > 0)
    //     this.buildings[bti].sectorList[data.scode] -= 1

    //   this.buildingsSubject.next(this.buildings[bti].list.splice(i, 1))
    // }, this)
  }

  private formatBuilding(id, data){
    return new Promise((resolve, reject) => {
      this.backend.getItem('buildings', data.code, {level: data.level}).then((building : UserBuilding) => {
        building.id = id
        building.level = data.level
        building.scode = data.scode
        building.buffed = false

        if(this.buildingModifiers[id]){
          if(building.production)
            building.production.out[0].per12h *= this.buildingModifiers[id]
          building.buffed = true
          delete this.buildingModifiers[id]
        }

        resolve(building)
      })
    })
  }

  public clearUser(){
    this.loadCache()
  }

  // CRUD

  public add(data){
    return this.db.list('/users/' + this.user.id + '/buildings').push(data).key
  }

  public move(bid, sid){
    this.db.object('/users/' + this.user.id + '/buildings/' + bid + '/sid').set(sid)
  }

  public upgrade(bid, level){
    this.db.object('/users/' + this.user.id + '/buildings/' + bid + '/level').set(level + 1)
  }

  public destroy(bid){
    // this.buffs.remove(bid)
    this.db.list('/users/' + this.user.id + '/buildings/').remove(bid)
  }

  // buff modifiers

  public setModifier(bcode, bid, x){
    let bti = this.buildings.findIndex(bt => bt.code == bcode)
    let i = this.buildings[bti].list.findIndex(b => b.id == bid)
    if(i != -1){
      if(this.buildings[bti].list[i].production)
        this.buildings[bti].list[i].production.out[0].per12h *= x
      this.buildings[bti].list[i].buffed = true
      this.buildingsSubject.next(this.buildings[bti].list[i])
    }
    else
      this.buildingModifiers[bid] ? this.buildingModifiers[bid] *= x : this.buildingModifiers[bid] = x
  }

  public removeModifier(bcode, bid, x){
    let bti = this.buildings.findIndex(bt => bt.code == bcode)
    let i = this.buildings[bti].list.findIndex(b => b.id == bid)
    if(i != -1){
      if(this.buildings[bti].list[i].production)
        this.buildings[bti].list[i].production.out[0].per12h /= x
      this.buildings[bti].list[i].buffed = false
      this.buildingsSubject.next(this.buildings[bti].list[i])
    }
    else if(this.buildingModifiers[bid])
      this.buildingModifiers[bid] == x ? delete this.buildingModifiers[bid] : this.buildingModifiers[bid] /= x
  }

}