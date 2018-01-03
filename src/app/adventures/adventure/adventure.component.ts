import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AdventuresService } from '../adventures.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss']
})
export class AdventureComponent implements OnInit {
	params
  zoomed = false

	menu = [
		{page: "camps", icon: "../../assets/icons/flag.png", name: "Camps"},
		{page: "guides", icon: "../../assets/icons/scroll.png", name: "Guides"}
	]

  constructor(public progress: ProgressService,

    private router: RoutingService,
    private route: ActivatedRoute,
  	
    public ads: AdventuresService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
  	this.ads.select(this.params.id).then(() => {
  		this.progress.unset()
  	})
  }

  goTo(page){
  	this.router.go(["adventures", this.params.id, page])
  }

  toggleZoom(){
    this.zoomed = !this.zoomed
  }
}
