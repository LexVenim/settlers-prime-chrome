import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { SectorsService }       from '../sectors.service';

import { menu }                 from './sectors.menu';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  isIsland = true
  menu = menu
	params

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public ss: SectorsService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
  	if(this.params.pass == "camps" || this.params.pass == "guide") {
      this.progress.set("Mapping the camps...")
      this.ss.getAdventureSectors(this.params.adventure).then(sectors => {
        this.cache.set("settlersprime-sectors", sectors)
        this.router.pass("enemies", this.params)
      })
    }
    else{
      this.ss.clean()
      this.progress.set("Sitting in mayor's chair...")
      this.cache.get("settlersprime-sectors").then((cachedSectors : Array<any>) => {
        if(cachedSectors) {
          this.ss.sectors = cachedSectors
          this.progress.unset()
        }
        else
          this.cache.get("settlersprime-sectors-mode").then(mode =>
            this.ss.getAdventureSectors(mode || "island").then((sectors : Array<any>) => {
              this.cache.set("settlersprime-sectors", sectors)
              this.ss.sectors = sectors
              this.progress.unset()
            }))
      })
    }
  }

  select(sector){
    this.ss.sector = sector
    this.router.go('sectors', sector, "map")
  }

  toggleIsland(){
    this.isIsland = !this.isIsland
    this.cache.set("settlersprime-sectors-mode", this.isIsland ? "island" : "archipelago")
  }
}