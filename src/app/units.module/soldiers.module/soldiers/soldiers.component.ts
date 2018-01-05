import { Component, OnInit } 		from '@angular/core';

import { ActivatedRoute }       from "@angular/router";

import { CacheService }         from '../../../services/cache.service';
import { ProgressService }      from '../../../services/progress.service';
import { RoutingService }       from '../../../services/routing.service';

import { SoldiersService }    	from '../soldiers.service';

@Component({
  selector: 'app-soldiers',
  templateUrl: './soldiers.component.html',
  styleUrls: ['./soldiers.component.scss']
})
export class SoldiersComponent implements OnInit {
	params
	units

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public sls: SoldiersService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
  	if(this.params.pass == "guides") {
  		this.progress.set("Gathering up troops...")
			this.sls.load().then((soldiers : Array<any>) => {
				this.cache.set("settlersprime-soldiers", soldiers)
				this.router.pass("specialists", this.params)
			})
    }
    else {
      this.progress.set("Gathering up troops...")
      this.cache.get('settlersprime-battle-units').then((units : any) => 
        this.cache.get('settlersprime-soldiers').then((soldiers : Array<any>) => {
          if(units && units.soldiers.length > 0){
            this.units = units.soldiers
            this.progress.unset()
          }
          else if(soldiers){
            this.units = soldiers.map(s => {s.amount = 0; return s})
            this.progress.unset()
          }
          else
            this.sls.load().then((new_soldiers : Array<any>) => {
              this.units = new_soldiers.map(s => {s.amount = 0; return s})
              this.progress.unset()
            })    
        }))
  	}
	}

	empty(){
		return this.units.filter(u => u.amount != 0).length == 0
	}

	next(){
		if(!this.empty()) {
      this.cache.get("settlersprime-battle-units").then((units : any) => {
        this.cache.set('settlersprime-battle-units', {enemies: units ? units.enemies : [], soldiers: this.units })
        this.router.go("specialists")
      })
    }
  }
}
