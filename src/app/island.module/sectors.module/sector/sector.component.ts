import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService } from '../../../services/cache.service';
import { ProgressService } from '../../../services/progress.service';
import { RoutingService } from '../../../services/routing.service';

import { BuffsService } from '../../../buffs.module/buffs.service';
import { BuildingsService } from '../../../buildings.module/buildings.service';
import { CampsService } from '../../camps.module/camps.service';
import { EnemiesService } from '../../../units.module/enemies.module/enemies.service';
import { MinesService } from '../../mines.module/mines.service';
import { ResourcesService } from '../../../resources.module/resources.service';
import { SectorsService } from '../../../island.module/sectors.module/sectors.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  buffBuilding
  params
  sector
  showAvailable = false
  showBuffs = false

  constructor(public progress: ProgressService,

    private cache: CacheService,
    private router: RoutingService,
    private route: ActivatedRoute,

    public bfs: BuffsService,
    public bs: BuildingsService,
    public cs: CampsService,
    public es: EnemiesService,
    public ms: MinesService,
    public rs: ResourcesService,
    public ss: SectorsService) { this.route.params.subscribe( params => this.params = params) }

  ngOnInit() {
    this.progress.set("Sitting in mayor's chair...")

    if(!this.ss.sector)
      this.ss.userSectorsUpdate().subscribe((sid) => {
        if(this.ss.userSectors[sid].code == this.params.id){
          this.ss.sector = sid
          this.progress.unset()
        }
      })

    this.cache.get('settlersprime-enemies').then((enemies : Array<any>) => 
      this.cs.loadAdventureCamps([this.params.id], enemies).then((camps) => {
        if(this.ss.sector)
          this.progress.unset()
      }))
  }


  unlock(){
  	this.progress.set('Purchasing land...')
  	this.ss.unlock(this.params.id).then(() => {
  		this.progress.unset()
  	})
  }

  showAvailableBuildings(){
    this.showAvailable = true
  }

  hideAvailableBuildings(){
    this.showAvailable = false
  }

  openBuffsMenu(bcode, bid){
    this.showBuffs = true
    this.buffBuilding = {code: bcode, id: bid}
  }

  applyBuff(buff){
    this.bfs.add(this.buffBuilding, buff)
    this.hideBuffs()
  }

  hideBuffs(){
    this.showBuffs = false
    this.buffBuilding = null
  }

  removeBuff(bid)
  {
    this.bfs.remove(bid)
  }

  addBuilding(code){
    this.bs.add({code: code, level: 1, scode: this.params.id})
    this.showAvailable = false
  }

  upgrade(id, level){
    this.bs.upgrade(id, level)
  }

  destroy(id){
    this.bs.destroy(id)
  }
}
