import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CacheService } from '../../services/cache.service';
import { ProgressService } from '../../services/progress.service';
import { RoutingService } from '../../services/routing.service';

import { AdventuresService } from '../adventures.service';
import { GuideService } from '../../services/guide.service';

@Component({
	selector: 'app-guides',
	templateUrl: './guides.component.html',
	styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit {
	params
	zoomed = false

	constructor(public progress: ProgressService,

		private cache: CacheService,
		private router: RoutingService,
		private route: ActivatedRoute,

		public ads: AdventuresService,
		public gs: GuideService) { this.route.params.subscribe( params => this.params = params ) }

	ngOnInit() {
		this.cache.remove('settlersprime-guide')

		this.ads.selectIfDiffirent(this.params.id)
	}

	selectGuide(gcode){
			this.cache.set('settlersprime-guide', gcode)
			this.router.go(["adventures", this.params.id, "guides", gcode])
	}

	goTo(page){
		this.router.go(["adventures", this.params.id, page])
	}

	toggleZoom(){
		this.zoomed = !this.zoomed
	}

}

@Pipe({
	name: 'campfilter',
	pure: false
})
export class CampFilterPipe implements PipeTransform {
	transform(items: any[], filter: any): any {
		if (!items || !filter) {
			return items;
		}

		return items.filter(item => item.code == filter.code);
	}
}