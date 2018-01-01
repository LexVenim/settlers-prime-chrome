import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { CacheService } from './cache.service';

@Injectable()
export class RoutingService {
  private tree = ["home"]

  constructor(private cache: CacheService,
    private router: Router) {}

  public go(state){
    this.tree.push(state)
    this.cache.set("settlersprime-state", this.tree)
    this.router.navigate(['/' + this.tree[this.tree.length - 1]])
  }

  public back(){
    if(this.tree.length > 1){
      this.tree.pop()
      this.cache.set("settlersprime-state", this.tree)
      this.router.navigate(['/' + this.tree[this.tree.length - 1]])
    }
  }

  public home(){
    this.tree = ["home"]
    this.cache.set("settlersprime-state", this.tree)
    this.router.navigate(['/home'])
  }

  public now(){
    return this.tree[this.tree.length - 1]
  }

  public prev(back = 1){
    return this.tree.length  > 1 ? this.tree[this.tree.length - back - 1] : null
  }

  public restore(tree){
    this.tree = tree

    if(this.now() == 'resource')
      this.back()
    else if(this.now() == 'sector')
      this.back()
    else
      this.go(this.now())
  }
}