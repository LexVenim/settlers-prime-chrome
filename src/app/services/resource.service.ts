import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { BackendService, Resource, UserResource } from './backend/backend.service';
import { CacheService } from './cache.service';

import { BuildingService } from './building.service';

@Injectable()
export class ResourceService {
  resources = []
  resource

  resourceHash = {}

  dependentResources = []

  constructor(public db: AngularFireDatabase,
    private backend: BackendService,
    private cache: CacheService,

    private bs: BuildingService) {}

  public load(resources = null){
    this.resources = []

    return new Promise((resolve, reject) => {
      if(!resources)
        this.backend.getItems('resources').then((resources: Array<Resource>) => {
          this.cache.set('settlersprime-resources', resources)
          this.resources = this.formatResources(resources)
          resources.forEach(r => this.resourceHash[r.code] = {icon: r.icon, name: r.name})
          resolve()
        })
      else {
        this.resources = this.formatResources(resources)
        resources.forEach(r => this.resourceHash[r.code] = {icon: r.icon, name: r.name})
        resolve()
      }
    })
  }

  private formatResources(resources){
    return resources.map(r => {
      r.economy = {
        in:{
          amount: 0,
          buildings: {
            amount: [],
            list: []
          }
        },
        out: {
          amount: 0,
          buildings: {
            amount: [],
            list: []
          }
        },
        total: 0
      }

      return r
    })
  }

  public loadCache(){
    return new Promise((resolve, reject) => 
      this.cache.get('settlersprime-resources').then(resources => 
        this.load(resources).then(() =>  resolve())))
  }

  public loadUser(){
    this.bs.buildingsUpdate().subscribe((b) => {
      if(b.production){
        if(b.production.in)
          b.production.in.forEach(r => this.updateResource(r.code))
        b.production.out.forEach(r => this.updateResource(r.code))
      }
    })
  }

  private updateResource(rCode){
    let inBuildings = this.bs.buildings.filter(b => b.list.length > 0 && b.production && b.production.in && b.production.in.findIndex(r => r.code == rCode) != -1)
    if(inBuildings.length > 0) {
      inBuildings = JSON.parse(JSON.stringify(inBuildings)).map(bt => {
        bt.list = bt.list.map(b => {
          b.production = b.production.in.find(r => r.code = rCode).per12h
          return b
        })
        return bt
      })
    }

    let inAmounts = {}
    inBuildings.forEach(b => {
      let a =  b.list.reduce((sum, cur) => {sum += cur.production; return sum}, 0)
      inAmounts[b.code] = a
    })

    let inTotal = 0
    for(let b in inAmounts)
      inTotal += inAmounts[b]

    let outBuildings = this.bs.buildings.filter(b => b.list.length > 0 && b.production && b.production.out && b.production.out.findIndex(r => r.code == rCode) != -1)
    if(outBuildings.length > 0) {
      outBuildings = JSON.parse(JSON.stringify(outBuildings)).map(bt => {
        bt.list = bt.list.map(b => {
          b.production = b.production.out[0].per12h
          return b
        })
        return bt
      })
    }

    let outAmounts = {}
    outBuildings.forEach(b => {
      let a =  b.list.reduce((sum, cur) => {sum += cur.production; return sum}, 0)
      outAmounts[b.code] = a
    })

    let outTotal = 0
    for(let b in outAmounts)
      outTotal += outAmounts[b]

    let i = this.resources.findIndex(r => r.code == rCode)
    this.resources[i].economy = {
      in:{
        amount: inTotal,
        buildings: {
          amount: inAmounts,
          list: inBuildings
        }
      },
      out: {
        amount: outTotal,
        buildings: {
          amount: outAmounts,
          list: outBuildings
        }
      },
      total: outTotal - inTotal
    }
  }

  public clearUser(){
    this.loadCache()
  }

  public getDependentResourcesList(rCode){
    console.log(rCode)
    let res = this.resources.find(r => r.code == rCode)
    let list = []
    list.push({
      code: res.code,
      icon: res.icon,
      name: res.name,
      total: res.economy.total
    })

    if(res.building){
      let building = this.bs.buildings.find(b => b.code == res.building)
      if(building.production.in){
        building.production.in.forEach(r => {
          let subList = this.getDependentResourcesList(r.code)
          subList.forEach(item => {
            let i = list.findIndex(li => li.code == item.code)
            if(i == -1)
              list.push(item)
          })
        })
      }
    }

    return list
  }

  public select(rCode){
    this.resource = this.resources.find(r => r.code == rCode)
    this.dependentResources = this.getDependentResourcesList(rCode).sort((a,b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0))
  }
}