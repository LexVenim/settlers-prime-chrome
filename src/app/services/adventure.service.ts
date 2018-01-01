import { Injectable } from '@angular/core';

import { BackendService, Adventure } from './backend/backend.service';
import { ProgressService } from './progress.service';

import { EnemyService } from './enemy.service';
import { GuideService } from './guide.service';
import { SectorService } from './sector.service';

@Injectable()
export class AdventureService {
  adventures
  adventure

  constructor(public progress: ProgressService,

    private backend: BackendService,

    public es: EnemyService,
    public gs: GuideService,
    public ss: SectorService) {}

  public load(){
    return new Promise((resolve, reject) => {
      this.backend.getItems('adventures').then((adventures : Array<Adventure>) => {
        this.adventures = adventures
        resolve()
      })
    })
  }

  public loadAdventureCategories(){
    return new Promise((resolve, reject) => {
      this.backend.getItems('adventures', {categorize: true}).then((adventures : Array<Adventure>) => {
        this.adventures = adventures
        resolve()
      })
    })
  }

  public select(aCode){
    return new Promise((resolve, reject) => {
      this.backend.getItem('adventures', aCode).then((adventure : Adventure) => {
        this.adventure = adventure

        this.progress.set('Estimating enemy force...')
        this.es.load(aCode).then(() => {
          this.progress.set('Mapping the camps...')
          this.ss.loadAdventure(aCode).then(() => {
            this.progress.set('Looking for guidance...')
            this.gs.load(aCode).then(() => {
              this.progress.unset()
              resolve()
            })
          })
        })
      })
    })
  }
}

