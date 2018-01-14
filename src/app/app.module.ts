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
import { CacheService } from './services/cache.service';
import { ProgressService } from './services/progress.service';
import { RoutingService } from './services/routing.service';
import { SettingsService } from './services/settings.service';
import { UserService } from './services/user.service';

// Routing

import { AppRoutesModule } 						from './app.routes';

import { BattleModule } 							from './battle.module/battle.module';
import { BuffsModule }               from './buffs.module/buffs.module';
import { BuildingsModule }            from './buildings.module/buildings.module';
import { ColonyModule }               from './colony.module/colony.module';
import { IslandModule } 							from './island.module/island.module';
import { ProfileModule } 							from './profile.module/profile.module';
import { ResourcesModule }            from './resources.module/resources.module';
import { UnitsModule }                from './units.module/units.module';

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

    BattleModule,
    BuffsModule,
    BuildingsModule,
    ColonyModule,
    IslandModule,
    ProfileModule,
    ResourcesModule,
    UnitsModule,

    AppRoutesModule
  ],
  providers: [
    AuthGuard, 
    AuthService,
    CacheService,
    ProgressService,
    RoutingService,
    SettingsService,
    UserService,

    BackendService,
    AsyncHttpManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
