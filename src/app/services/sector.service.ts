import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { BackendService, Sector } from './backend/backend.service';
import { CacheService } from './cache.service';

import { CampService } from './camp.service';
import { MineService } from './mine.service';
import { UserService } from './user.service';

@Injectable()
export class SectorService {
  sectors
  sector

  constructor(public db: AngularFireDatabase,

    private backend: BackendService,
    private cache: CacheService,

    public cs: CampService,
    public ms: MineService,
    private user: UserService) {}

  public createUser(){
    return new Promise((resolve, reject) => { 
      this.backend.getItems('sectors', {adventure: 'island'}).then((isectors: any) => {
        this.backend.getItems('sectors', {adventure: 'archipelago'}).then((asectors: any) => {
          let userSectors = isectors.concat(asectors)

          let promises = []

          userSectors.forEach(s =>
            promises.push(
              new Promise((resolve, reject) => {
                this.cs.loadSector(s.code).then(() => resolve())
              })))

          Promise.all(promises).then(() => {
            let newSectors = {}
            userSectors.forEach(s => {
              newSectors[s.code] = {
                camps: this.cs.camps.filter(c => c.sector == s.code).map(c => c.code),
                locked: s.code == "i1" ? false : true
              }
            })

            resolve(newSectors)
          })
        })
      })
    })
  }

  public load(sectors = null){
    this.sectors = []

    return new Promise((resolve, reject) => {
      if(!sectors)
        this.backend.getItems('sectors', {adventure: 'island'}).then((isectors: Array<Sector>) => {
          this.backend.getItems('sectors', {adventure: 'archipelago'}).then((asectors: Array<Sector>) => {
            let s = isectors.concat(asectors)
            this.cache.set('settlersprime-sectors', s)
            this.sectors = s.sort((a,b) => a.order - b.order)

            let promises = []
            s.forEach(sc => {
              promises.push(this.cs.loadSector(sc.code))
              promises.push(this.ms.loadSector(sc.code))
            })

            Promise.all(promises).then(() => {
              this.cache.set('settlersprime-camps', this.cs.camps)
              this.cache.set('settlersprime-mines', this.ms.mines)
              resolve()
            })
          })
        })
      else {
        this.sectors = sectors.sort((a,b) => a.order - b.order)
        this.cs.loadCache()
        this.ms.loadCache()
        resolve()
      }
    })
  }

  public loadAdventure(aCode){
    return new Promise((resolve, reject) => {
      if(this.sectors.filter(s => s.adventure == aCode).length == 0)
        this.backend.getItems('sectors', {adventure: aCode}).then((sectors: Array<Sector>) => {
          this.sectors = this.sectors.concat(sectors).sort((a,b) => a.order - b.order)

          let promises = []
          sectors.forEach(s => 
            promises.push(this.cs.loadSector(s.code)))

          Promise.all(promises).then(() => resolve())
        })
      else
        resolve()
    })
  }

  public loadCache(){
    return new Promise((resolve, reject) => 
      this.cache.get('settlersprime-sectors').then(sectors => 
        this.load(sectors).then(() => resolve())))
  }

  public loadUser(){
    // this.db.list('/users/' + this.user.id + '/sectors').$ref.on("child_added", function(snapshot) {
    //   let data = snapshot.val()
    //   let i = this.sectors.findIndex(s => s.code == snapshot.key)
    //   this.sectors[i].camps = data.camps
    //   this.sectors[i].locked = data.locked
    // }, this)

    // this.db.object('/users/' + this.user.id + '/sectors').$ref.on('child_changed', function(snapshot){ 
    //   let data = snapshot.val()
    //   let i = this.sectors.findIndex(s => s.code == snapshot.key)
    //   this.sectors[i].camps = data.camps
    //   this.sectors[i].locked = data.locked
    // }, this)
  }

  public clearUser(){
    this.loadCache()
  }

  public unlock(sCode){
    return new Promise((resolve, reject) => {
      let data = { locked: false, camps: null }    
      this.db.list('/users/' + this.user.id + '/sectors').update(sCode, data).then(() => resolve())
    })
  }

  public updateCamps(scode, camps){
    this.db.object('/users/' + this.user.id + '/sectors/' + scode + '/camps').set(camps)
  }

  public select(sCode){
    this.sector = this.sectors.find(s => s.code == sCode)
    if(!this.user.id)
      this.sector.locked = false
  }
}