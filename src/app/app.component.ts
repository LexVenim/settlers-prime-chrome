import { Component } from '@angular/core';

import { AuthGuard } from './common/auth.guard';

import { AuthService } from './services/auth.service';
import { RoutingService } from './services/routing.service';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private router: RoutingService,
		public auth: AuthService,
		public user: UserService,
		private aguard: AuthGuard) { }

	logout(){
		this.router.home()
		this.auth.logout()
	}

	goTo(page){
		this.router.go(page)
	}

	home(){
		this.router.home()
	}

	back(){
		this.router.back()
	}

	now(){
		return this.router.now()
	}
}