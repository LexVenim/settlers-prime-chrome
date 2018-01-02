import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { UserService } from './user.service';

@Injectable()
export class SettingsService {
  private settings
  settingsRef

  constructor(public db: AngularFireDatabase,
    private user: UserService) {}

  public create(){
    return { 
      rules: {
        buildingLimit: false,
        onlyOwnedGenerals: false
      },
      language: "en",
      notifications: {
        enableNotifications: false
      }
    }
  }

  public load(){
    return new Promise((resolve, reject) => {
      this.settingsRef = this.db.list('/users/' + this.user.id + '/settings').valueChanges().subscribe(snapshot => {
        this.settings = snapshot
        resolve()
      });
    })
  }

  public all(){
    return this.settings
  }

  public get(code){
    return this.settings[code] != null ? this.settings[code] : {} 
  }

  public update(code, data, sub = null){
    sub ? this.db.object('/users/' + this.user.id + '/settings/' + sub + '/' + code).set(data) : this.db.object('/users/' + this.user.id + '/settings/' + code).set(data)
  }
}