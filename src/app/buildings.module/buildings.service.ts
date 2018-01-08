import { Injectable }            from '@angular/core';
import { AngularFireDatabase }   from 'angularfire2/database';
import { Observable, Subject }   from 'rxjs';

import { BackendService, Building, UserBuilding } from '../services/backend/backend.service';

import { UserService }           from '../services/user.service';

@Injectable()
export class BuildingsService {
  private buildingsSubject = new Subject<any>()

  buildings = []
  building
  userBuildings = []

  private buildingModifiers = {}

  constructor(private db: AngularFireDatabase,
              private backend: BackendService,

              private user: UserService) { }

  public buildingsUpdate() : Observable<any> {
    return this.buildingsSubject.asObservable()
  }

  public createUser(){
    return { mayorhouse: { scode: "i1", code: "mayorhouse", level: 1 } }
  }

  public load(cachedBuildings = null){
    this.buildings = []
    return new Promise((resolve, reject) => {
      if(!cachedBuildings)
        this.backend.getItems('buildings').then((buildings: Array<Building>) => {
          this.buildings = buildings
          resolve()
        })
      else {
        this.buildings = cachedBuildings
        resolve()
      }
    })
  }

  public loadUser(){
    this.db.list('/users/' + this.user.id + '/buildings').stateChanges().subscribe(event => {
      let data = event.payload.val()
      let bti, i

      switch (event.type) {
        case "child_added":
          this.formatBuilding(event.payload.key, data).then(b => {
            this.userBuildings.push(b)
            this.buildingsSubject.next(b)
          })
          break;

        case "child_changed":
          i = this.userBuildings.findIndex(b => b.id == event.payload.key)
          this.formatBuilding(event.payload.key, data).then(b => {
            this.userBuildings[i] = b
            this.buildingsSubject.next(b)
          })
          break;

        case "child_removed":
          i = this.userBuildings.findIndex(b => b.id == event.payload.key)
          this.buildingsSubject.next(this.userBuildings[i].splice(i))
          break;

        default:
        break;
      }
    })
  }

  private formatBuilding(id, data){
    return new Promise((resolve, reject) => {
      this.backend.getItem('buildings', data.code, {level: data.level}).then((building : UserBuilding) => {
        building.id = id
        building.code = data.code
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

  public cleanUser(){
    this.userBuildings = []
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
    let bti = this.userBuildings.findIndex(bt => bt.code == bcode)
    let i = this.userBuildings[bti].list.findIndex(b => b.id == bid)
    if(i != -1){
      if(this.userBuildings[bti].list[i].production)
        this.userBuildings[bti].list[i].production.out[0].per12h *= x
      this.userBuildings[bti].list[i].buffed = true
      this.buildingsSubject.next(this.userBuildings[bti].list[i])
    }
    else
      this.buildingModifiers[bid] ? this.buildingModifiers[bid] *= x : this.buildingModifiers[bid] = x
  }

  public removeModifier(bcode, bid, x){
    let bti = this.userBuildings.findIndex(bt => bt.code == bcode)
    let i = this.userBuildings[bti].list.findIndex(b => b.id == bid)
    if(i != -1){
      if(this.userBuildings[bti].list[i].production)
        this.userBuildings[bti].list[i].production.out[0].per12h /= x
      this.userBuildings[bti].list[i].buffed = false
      this.buildingsSubject.next(this.userBuildings[bti].list[i])
    }
    else if(this.buildingModifiers[bid])
      this.buildingModifiers[bid] == x ? delete this.buildingModifiers[bid] : this.buildingModifiers[bid] /= x
  }

}