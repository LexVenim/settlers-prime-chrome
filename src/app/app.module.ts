import { BrowserModule } 			from '@angular/platform-browser';
import { NgModule } 					from '@angular/core';
import { RouterModule } 			from '@angular/router';
import { FormsModule } 				from '@angular/forms';
import { HttpModule } 				from '@angular/http';

import { AppComponent } 			from './app.component';

// Firebase Integration

import * as firebase 									from 'firebase/app';

import { AngularFireModule } 					from 'angularfire2';
import { AngularFireDatabaseModule } 	from 'angularfire2/database';
import { AngularFireAuthModule } 			from 'angularfire2/auth';

import { firebaseConfig } 						from './common/firebase.config';

// Services

import { BackendService } from './services/backend/backend.service';
import { AsyncHttpManager } from './services/backend/async_http.manager';


import { AuthService } from './services/auth.service';
import { BattleService } from './services/battle.service';
import { BuffService } from './services/buff.service';
import { BuildingService } from './services/building.service';
import { CacheService } from './services/cache.service';
import { CampService } from './services/camp.service';
import { EnemyService } from './services/enemy.service';
import { GuideService } from './services/guide.service';
import { MineService } from './services/mine.service';
import { ProgressService } from './services/progress.service';
import { ResourceService } from './services/resource.service';
import { RoutingService } from './services/routing.service';
import { SectorService } from './services/sector.service';
import { SettingsService } from './services/settings.service';
import { SoldierService } from './services/soldier.service';
import { SpecialistService } from './services/specialist.service';
import { UserService } from './services/user.service';

// Routing

import { AppRoutesModule } 						from './app.routes';
import { AdventuresModule }           from './adventures/adventures.module';
import { BattleModule } 							from './battle/battle.module';
import { EconomyModule } 							from './economy/economy.module';
import { IslandModule } 							from './island/island.module';
import { ProfileModule } 							from './profile/profile.module';

import { AuthGuard } 							    from './common/auth.guard';

import { HomeComponent }              from './home/home.component';
import { LoginComponent }             from './login/login.component';
import { NotFoundComponent }          from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
  	FormsModule,
  	HttpModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    AdventuresModule,
    BattleModule,
    EconomyModule,
    IslandModule,
    ProfileModule,

    AppRoutesModule
  ],
  providers: [
    AuthGuard, 
    AuthService,
    BattleService,
    BuffService,
    BuildingService,
    CacheService,
    CampService,
    EnemyService,
    GuideService,
    MineService,
    ProgressService,
    ResourceService,
    RoutingService,
    SectorService,
    SettingsService,
    SoldierService,
    SpecialistService,
    UserService,

    BackendService,
    AsyncHttpManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
