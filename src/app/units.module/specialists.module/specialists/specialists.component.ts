import { Component, OnInit } 		from '@angular/core';

import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { SpecialistsService }    	from '../specialists.service';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent implements OnInit {
	params
	units
	general

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public sps: SpecialistsService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
  	if(this.params.pass == "guides") {
  		this.progress.set("Hiring specialists...")
			this.sps.load('general').then((generals : Array<any>) => {
				this.cache.set("settlersprime-specialists", generals)
				this.router.go(this.params.pass, {adventure: this.params.adventure})
			})
  	}
  	else {
			this.progress.set("Hiring specialists...")
      this.cache.get('settlersprime-battle-general').then((general : any) => 
        this.cache.get('settlersprime-specialists').then((specialists : Array<any>) => {
					this.units = specialists
					this.general = general || this.units.find(g => g.code == "normalgeneral")
          this.progress.unset()
        }))
		}
	}

	next(){
		this.cache.set('settlersprime-battle-general', this.general)
		this.router.go("battle", "preview")
	}

	select(general){
		this.general = general
	}
}
