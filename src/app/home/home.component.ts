import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ProgressService } from '../services/progress.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	menu : any = [
    {page: "battle", icon: "../../assets/icons/swords.png", name: "Battle"},
    {page: "economy", icon: "../../assets/icons/mill.png", name: "Economy"},
    {page: "trade", icon: "../../assets/icons/coins.png", name: "Trade", lock: true},

    {page: "island", icon: "../../assets/icons/castle.png", name: "Island", auth: true},
    {page: "adventures", icon: "../../assets/icons/ship.png", name: "Adventures"},
    {page: "quests", icon: "../../assets/icons/scroll.png", name: "Quests", lock: true},

    {page: "timers", icon: "../../assets/icons/timer.png", name: "Timers", auth: true, lock: true},
    {page: "forum", icon: "../../assets/icons/group.png", name: "Forum", auth: true, lock: true},
    {page: "guild", icon: "../../assets/icons/shield-1.png", name: "Guild", auth: true, lock: true}
  ]

  constructor(public progress: ProgressService,

    private af: AuthService,
    private router: RoutingService) { }

  ngOnInit() { }

  goTo(page){
    let item = this.menu.find(i => i.page == page)
    if(!item.lock){
      if(!item.auth || this.isLoggedIn())
        this.router.go(page)
      else
        this.login()
    }
    
  }

  login(){
    this.router.go("login")
  }

  isLoggedIn(){
    return this.af.isLoggedIn()
  }

}
