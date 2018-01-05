import { Injectable }               from '@angular/core';
import { AngularFireDatabase }      from 'angularfire2/database';

import { BackendService, Sector }   from '../../services/backend/backend.service';

import { CampsService }             from '../camps.module/camps.service';

@Injectable()
export class SectorsService {
  sectors = []
  sector

  constructor(private backend: BackendService,
              private db: AngularFireDatabase,

              public cs: CampsService) {}
   

  public createUser(){
    return new Promise((resolve, reject) => { 
      this.backend.getItems('sectors', {adventure: 'island'}).then((isectors: any) => {
        this.backend.getItems('sectors', {adventure: 'archipelago'}).then((asectors: any) => {
          let userSectors = isectors.concat(asectors)

          this.cs.loadAdventureCamps(userSectors).then(() => {
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

  // public load(sectors = null){
  //   this.sectors = []

  //   return new Promise((resolve, reject) => {
  //     if(!sectors)
  //       this.backend.getItems('sectors', {adventure: 'island'}).then((isectors: Array<Sector>) => {
  //         this.backend.getItems('sectors', {adventure: 'archipelago'}).then((asectors: Array<Sector>) => {
  //           let s = isectors.concat(asectors)
  //           this.sectors = s.sort((a,b) => a.order - b.order)

  //           let promises = []
  //           s.forEach(sc => {
  //             promises.push(this.cs.loadSector(sc.code))
  //             // promises.push(this.ms.loadSector(sc.code))
  //           })

  //           Promise.all(promises).then(() => {
  //             resolve()
  //           })
  //         })
  //       })
  //     else {
  //       this.sectors = sectors.sort((a,b) => a.order - b.order)
  //       this.cs.loadCache()
  //       // this.ms.loadCache()
  //       resolve()
  //     }
  //   })
  // }

  public getAdventureSectors(adventure){
    return new Promise((resolve, reject) => {
      this.backend.getItems("sectors", {adventure: adventure}).then((sectors: Array<Sector>) => 
        resolve(sectors.sort((a,b) => a.order - b.order)))
    })
  }

  // public loadUser(){
  //   this.db.list('/users/' + this.user.id + '/sectors').stateChanges().subscribe(event => {
  //     let data = event.payload.val()
  //     let i

  //     switch (event.type) {
  //       case "child_added":
  //         i = this.sectors.findIndex(s => s.code == event.payload.key)
  //         this.sectors[i].camps = data.camps
  //         this.sectors[i].locked = data.locked
  //         break;

  //       case "child_changed":
  //         i = this.sectors.findIndex(s => s.code == event.payload.key)
  //         this.sectors[i].camps = data.camps
  //         this.sectors[i].locked = data.locked
  //         break;
        
  //       default:
  //         break;
  //       }
  //     })
  // }

  // public clearUser(){
  //   this.loadCache()
  // }

  // public unlock(sCode){
  //   return new Promise((resolve, reject) => {
  //     let data = { locked: false, camps: null }    
  //     this.db.list('/users/' + this.user.id + '/sectors').update(sCode, data).then(() => resolve())
  //   })
  // }

  // public updateCamps(scode, camps){
  //   this.db.object('/users/' + this.user.id + '/sectors/' + scode + '/camps').set(camps)
  // }

  // public select(sCode){
  //   this.sector = this.sectors.find(s => s.code == sCode)
  //   if(!this.user.id)
  //     this.sector.locked = false
  // }
}