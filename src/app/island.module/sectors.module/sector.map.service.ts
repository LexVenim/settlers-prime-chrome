import { Injectable }  from '@angular/core';

import * as i1       from './maps/i1.map';
import * as i2       from './maps/i2.map';
import * as i3       from './maps/i3.map';
import * as i4       from './maps/i4.map';
import * as i5       from './maps/i5.map';
import * as i6       from './maps/i6.map';
import * as i7       from './maps/i7.map';
import * as i8       from './maps/i8.map';
import * as i9       from './maps/i9.map';

@Injectable()
export class SectorMapService {
  private maps = {}

  constructor() {
    this.maps = {
      "i1": i1,
      "i2": i2,
      "i3": i3,
      "i4": i4,
      "i5": i5,
      "i6": i6,
      "i7": i7,
      "i8": i8,
      "i9": i9
    }
  }
   
  get(map){
    return this.maps[map]
  }
}