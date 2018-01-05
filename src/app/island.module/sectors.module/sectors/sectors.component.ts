import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { SectorsService }       from '../sectors.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
	params

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public ss: SectorsService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
  	this.progress.set("Mapping the camps...")
  	if(this.params.pass == "camps" || this.params.pass == "guide")
      this.ss.getAdventureSectors(this.params.adventure).then(sectors => {
        console.log(sectors)
        this.cache.set("settlersprime-sectors", sectors)
        this.router.pass("enemies", this.params)
      })
  }

}
