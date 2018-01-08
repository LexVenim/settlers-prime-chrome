import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

interface User {
  avatar?: string
  email: string
  name: string
}

@Injectable()
export class UserService {
  private user : User;
  id

  constructor(public db: AngularFireDatabase) {
  }

  create(id, data){
    return new Promise((resolve, reject) => 
      this.db.object('/users/' + id).set(data).then(() =>
        resolve()))
  }

  load(id) {
    this.id = id

    return new Promise((resolve, reject) => {
      this.db.object<User>('/users/' + this.id + '/user').valueChanges().subscribe(snapshot => {
        this.user = snapshot
        resolve()
      })
    })
  }

  cleanUser(){
    this.user = null
    this.id = null
  }

  exists(id){
    return new Promise((resolve, reject) => {
      this.db.object("/users").snapshotChanges().subscribe(snapshot => {
        if(!snapshot.key)
          resolve(false) 
        else 
          this.db.object('/users/' + id).snapshotChanges().subscribe(snapshot => snapshot.key ? resolve(true) :  resolve(false))
      })
    });
  }

  save(data){
    this.db.list('/users/' + this.id).update('user', data);
  }

  delete(){
    this.db.list('/users').remove(this.id)
  }

  avatar(){
    return this.user && this.user.avatar ? this.user.avatar : null
  }

  email(){
    return this.user && this.user.email ? this.user.email : "Email"
  }

  name(){
    return this.user && this.user.name ? this.user.name : "Unknown User"
  }
}