import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { BackendService, Resource, UserResource } from '../services/backend/backend.service';

import { BuildingsService } from '../buildings.module/buildings.service';

@Injectable()
export class ResourcesService {
  resources = []
  resource

  dependentResources = []

  constructor(private db: AngularFireDatabase,
					    private backend: BackendService,

					    private bs: BuildingsService) {}

  public load(cachedResources = null){
    this.resources = []
    return new Promise((resolve, reject) => {
      if(!cachedResources)
        this.backend.getItems('resources').then((resources: Array<Resource>) => {
          this.resources = this.formatResources(resources)
          resolve()
        })
      else {
        this.resources = this.formatResources(cachedResources)
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
  	let inBuildings = this.bs.userBuildings.filter(b => b.production && b.production.in && b.production.in.findIndex(r => r.code == rCode) != -1)
  	if(inBuildings.length > 0) {
  		inBuildings = inBuildings
  		.sort((a,b) => (a.code == b.code) ? a.level - b.level : ((a.code < b.code) ? -1 : 1))
  		.map(b => {
  			b.production = b.production.in.find(r => r.code = rCode).per12h
  			return b
  		})
  	}

  	let inTotal = inBuildings.reduce((sum, cur) => {sum += cur.production; return sum}, 0)

  	let outBuildings = this.bs.userBuildings.filter(b => b.production && b.production.out && b.production.out.findIndex(r => r.code == rCode) != -1)
  	if(outBuildings.length > 0) {
  		outBuildings = outBuildings
  		.sort((a,b) => (a.code == b.code) ? a.level - b.level : ((a.code < b.code) ? -1 : 1))
  		.map(b => {
  			b.production = b.production.out[0].per12h
  			return b
  		})
  	}

  	let outTotal = outBuildings.reduce((sum, cur) => {sum += cur.production; return sum}, 0)

  	let i = this.resources.findIndex(r => r.code == rCode)
  	this.resources[i].economy = {
  		in:{
  			amount: inTotal,
  			buildings: inBuildings
  		},
  		out: {
  			amount: outTotal,
  			buildings: outBuildings
  		},
  		total: outTotal - inTotal
  	}
  }

  public cleanUser(cachedResources = null){
    this.load(cachedResources)
  }

  public getDependentResourcesList(rCode){
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