import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
 
import { ProfileHomeComponent } 		from './profile-home/profile-home.component';

import { ProfileService }            from './profile.service';

import { ProfileRoutesModule }       from './profile.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ProfileRoutesModule
  ],
  declarations: [
  	ProfileHomeComponent
  ],
  providers: [ ProfileService ]
})
export class ProfileModule {}