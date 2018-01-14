import { Injectable }               from '@angular/core';
import { AngularFireDatabase }      from 'angularfire2/database';
import { Observable, Subject }   from 'rxjs';

import { BackendService, Sector }   from '../../services/backend/backend.service';

import { CampsService }             from '../camps.module/camps.service';
import { UserService }              from '../../services/user.service';

@Injectable()
export class SectorsService {
  private sectorsSubject = new Subject<any>()

  sectors = []
  sector
  userSectors = []

  constructor(private backend: BackendService,
              private db: AngularFireDatabase,

              private cs: CampsService,
              private user: UserService) {}

  public userSectorsUpdate() : Observable<any> {
    return this.sectorsSubject.asObservable()
  }
   
  public createUser(){
    return new Promise((resolve, reject) => { 
      this.backend.getItems('sectors', {adventure: 'island'}).then((isectors: any) => {
        this.backend.getItems('sectors', {adventure: 'archipelago'}).then((asectors: any) => {
          this.userSectors = isectors.concat(asectors)
          .map(s => {
            s.name = (s.code[0] == "i" ? "Island" : "Archipelago") + " sector #" + s.order.toString()
            return s
          })

          this.cs.loadAdventureCamps(this.userSectors).then(() => {
            let newSectors = {}
            this.userSectors.forEach(s => {
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

  public getAdventureSectors(adventure){
    return new Promise((resolve, reject) => {
      this.backend.getItems("sectors", {adventure: adventure}).then((sectors: Array<Sector>) => 
        resolve(sectors.sort((a,b) => a.order - b.order)))
    })
  }

  public clean(){
    this.sector = undefined
  }

  public loadUser(){
    this.createUser().then((sectors : Array<any>) => {
      this.db.list('/users/' + this.user.id + '/sectors').stateChanges().subscribe(event => {
        let data = event.payload.val()
        let i

        switch (event.type) {
          case "child_added":
            i = this.userSectors.findIndex(s => s.code == event.payload.key)
            this.userSectors[i].camps = data.camps
            this.userSectors[i].locked = data.locked
            this.sectorsSubject.next(i)
            break;

          case "child_changed":
            i = this.userSectors.findIndex(s => s.code == event.payload.key)
            this.userSectors[i].camps = data.camps
            this.userSectors[i].locked = data.locked
            break;

          default:
            break;
        }
      })
    })  
  }

  public cleanUser(){
    this.userSectors = []
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
}