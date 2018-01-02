import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { CacheService } from './cache.service';

@Injectable()
export class RoutingService {
  private loaded = false
  private tree = [["/home"]]

  constructor(private cache: CacheService,
    private router: Router) { }

  public load(){
    return new Promise((resolve, reject) => {
      this.cache.get("settlersprime-tree").then((tree : any) => {
        if(tree){
          this.tree = tree
          this.router.navigate(this.tree[this.tree.length - 1])
        }
        this.loaded = true
        resolve()
      })
    })
  }

  public isLoaded(){
    return this.loaded
  }

  public go(path){
    console.log(path)
    this.tree.push(path)
    this.cache.set("settlersprime-tree", this.tree)
    this.router.navigate(path)
  }

  public back(){
    if(this.tree.length > 1){
      this.tree.pop()
      this.cache.set("settlersprime-tree", this.tree)
      this.router.navigate(this.tree[this.tree.length - 1])
    }
  }

  public home(){
    this.tree = [["/home"]]
    this.cache.set("settlersprime-tree", this.tree)
    this.router.navigate(['/home'])
  }

  public length(){
    return this.tree.length
  }
}