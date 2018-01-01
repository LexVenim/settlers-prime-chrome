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

// Routing

import { AppRoutesModule } 						from './app.routes';
import { BattleModule } 							from './battle/battle.module';
import { EconomyModule } 							from './economy/economy.module';
import { IslandModule } 							from './island/island.module';
import { ProfileModule } 							from './profile/profile.module';

// import { AuthGuard } 							from './common/auth.guard';

import { NotFoundComponent } 					from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,

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
    EconomyModule,
    IslandModule,
    ProfileModule,

    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
