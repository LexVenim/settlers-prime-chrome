import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { BackendService } from './backend/backend.service';
import { CacheService } from './cache.service';
import { ProgressService } from './progress.service';
import { RoutingService } from './routing.service';

import { BuffService } from './buff.service';
import { BuildingService } from './building.service';
import { EnemyService } from './enemy.service';
import { ResourceService } from './resource.service';
import { SectorService } from './sector.service';
// import { SettingsService } from './settings.service';
import { SoldierService } from './soldier.service';
import { SpecialistService } from './specialist.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private isLogged = false
  private user: Observable<firebase.User>;

  constructor(public progress: ProgressService,

    private af: AngularFireAuth,
    private backend: BackendService,
    private cache: CacheService,
    private router: RoutingService,
    
    private bfs: BuffService,
    private bs: BuildingService,
    private es: EnemyService,
    private rs: ResourceService,
    private ss: SectorService,
    public sps: SpecialistService,
    public sls: SoldierService,
    // private settings: SettingsService,
    private us: UserService) 
  {
    let spVersion = '2.0.7'
    this.cache.get('settlersprime-version').then(version => {

      if(!version || version != spVersion){
        this.cache.clear()
        this.cache.set('settlersprime-version', spVersion)
        console.log("Version updated!")
      }
      else
        console.log('Version is up-to-date')

      this.user = af.authState;
      this.loadCache().then(() =>
        this.user.subscribe(auth => auth == null ? this.loadUnauthorized() : this.loadAuthorized(auth)))
    })
  }

  private loadCache(){
    return new Promise((resolve, reject) => {
      this.loadServices().then(() => 
        this.loadStateTree().then(() => resolve()))
    })
  }

  private loadStateTree(){
    this.progress.set('Growing the trees...')
    return new Promise((resolve, reject) => {
      this.cache.get("settlersprime-state").then((stateTree : any) => {
        if(stateTree)
          this.router.restore(stateTree)
        resolve()
      })
    })
  }

  private loadServices(){
    return new Promise((resolve, reject) => {

      this.progress.set('Loading...')
      this.es.loadCache().then(() => {
        this.progress.set('Acquiring blueprints...')
        this.bs.loadCache().then(() => {
          this.progress.set('Visiting Aunt Irma...')
          this.bfs.loadCache().then(() => {
            this.progress.set('Searching for resources...')
            this.rs.loadCache().then(() => {
              this.progress.set('Drawing maps...')
              this.ss.loadCache().then(() => {
                this.progress.set('Gathering up forces...')
                this.sls.loadCache().then(() => {
                  this.progress.set('Hiring specialists...')
                  this.sps.loadCache().then(() =>
                    resolve())
                })
              })
            })
          })
        })
      })
    })
  }

  private loadAuthorized(auth){
    this.isLogged = true
    this.progress.set('Coming to the light...')

    this.createUserIfNotExist(auth).then(() =>         
      this.loadUser(auth.uid).then(() => {
        this.progress.unset()
        this.cache.set("settlersprime-logged", true)
      }))
  }

  private loadUnauthorized(){
    this.isLogged = false
    this.progress.unset()

    this.cache.set("settlersprime-logged", false)
  }

  // auth methods

  signup(email, password){
    return this.af.auth.createUserWithEmailAndPassword(email, password).then(() => this.router.home())
  }

  login(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password).then(() => this.router.home())
  }

  loginGoogle(interactive) {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
        if (chrome.runtime.lastError && !interactive) {
          console.log('It was not possible to get a token programmatically.');
          this.progress = null
          resolve(null)
        } else if(chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          this.progress = null
          resolve(null)
        } else if (token) {
          var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
          firebase.auth().signInWithCredential(credential).then((authData) => {
            resolve(authData)
          })
        } else {
          console.error('The OAuth Token was null');
          this.progress = null
          resolve(null)
        }
      });
    })
  }

  logout() {

    this.us.clearUser()
    this.bs.clearUser()
    this.bfs.clearUser()
    this.rs.clearUser()
    this.ss.clearUser()

    this.router.home()
    return this.af.auth.signOut()
  }

  // user creation and loading

  createUserIfNotExist(authData){
    return new Promise((resolve, reject) => {
      this.us.exists(authData.uid).then(exist => {
        if(!exist)
          this.createUser(authData.uid, {user: {email: authData.email, name: authData.email.split('@')[0]}}).then(() => 
            resolve())
        else {
          resolve()
        }
      })
    })
  }

  createUser(id, data){
    return new Promise((resolve, reject) => {
      this.progress.set("Conquering sectors...")
      this.ss.createUser().then(sectors => {

        this.progress.set("Building mayorhouse...")
        data.buildings = this.bs.createUser()
        data.sectors = sectors

        this.us.create(id, data).then(() =>
          resolve())
      })
    })
  }

  loadUser(id){
    return new Promise((resolve, reject) => {
      this.progress.set("Going through papers..")
      this.us.load(id).then(res => {

        this.bs.loadUser()
        this.bfs.loadUser()
        this.rs.loadUser()
        this.ss.loadUser()

        this.progress.set("Taking over the world...")
        resolve()
      })
    })
  }

  // reauthentication

  reauthenticate(password){
    let credential = firebase.auth.EmailAuthProvider.credential(this.af.auth.currentUser.email, password)
    return new Promise((resolve, reject) => {
      this.af.auth.currentUser.reauthenticateWithCredential(credential).then(function() {
        resolve(true)
      }, function(error) {
        reject(error)
      });
    })
  }

  // email and password

  email(){
    return this.af.auth.currentUser.email;
  }

  changeEmail(email){
    return new Promise((resolve, reject) => {
      this.af.auth.currentUser.updateEmail(email).then(function() {
        resolve(true)
      }, function(error) {
        reject(error)
      });
    })
  }

  changePassword(password){
    return new Promise((resolve, reject) => {
      this.af.auth.currentUser.updatePassword(password).then(function() {
        resolve(true)
      }, function(error) {
        reject(error)
      });
    })
  }

  // check-up method

  isLoggedIn(){
    return this.isLogged
  }
}