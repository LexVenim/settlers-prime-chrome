import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ProgressService } from '../services/progress.service';
import { RoutingService } from '../services/routing.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	social = [
		{name: "google", icon: "fa fa-google", color: "#df4a32"},
		{name: "facebook", icon: "fa fa-facebook", color: "#3b5998"},
		{name: "twitter", icon: "fa fa-twitter", color: "#00b6f1"},
		{name: "vk", icon: "fa fa-vk",  color: "#4c75a3"}
	]

	constructor(public progress: ProgressService,

		private af: AuthService,
		private router: RoutingService) { 
	}

	ngOnInit() {}

	login(f: NgForm){
		if (f.valid) {
			this.progress.set("Obtaining land deed...")
			this.af.signup(f.value.email, f.value.password).catch((error) => 
				this.af.login(f.value.email, f.value.password).catch((error:any) => {
					this.af.progress = null
					console.log(error)
				}))
		}
	}

	loginGoogle(){
		this.progress.set("Obtaining land deed...")
		this.af.loginGoogle(true).then(() => this.router.home())
	}
}
