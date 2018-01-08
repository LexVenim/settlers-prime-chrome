import { Component, OnInit, AfterViewInit, ViewChild }     from '@angular/core';
import { ActivatedRoute }                   from "@angular/router";

import { CacheService }                     from '../../../services/cache.service';
import { ProgressService }                  from '../../../services/progress.service';
import { RoutingService }                   from '../../../services/routing.service';

import { SectorMapService }                 from '../sector.map.service';

@Component({
  selector: 'app-sector-map',
  templateUrl: './sector-map.component.html',
  styleUrls: ['./sector-map.component.scss']
})
export class SectorMapComponent implements OnInit, AfterViewInit {
  canvasFilled = false
	map
  params

  @ViewChild("myCanvas") canvasRef;

  constructor(public progress: ProgressService,

              private cache: CacheService,
              private router: RoutingService,
              private route: ActivatedRoute,

              public sms: SectorMapService) { this.route.params.subscribe( params => this.params = params ) }

  ngOnInit() {
    this.map = this.sms.get(this.params.id)
  }

  ngAfterViewInit(){
    this.fillCanvas()
  }

  fillCanvas(){
    let canvas = this.canvasRef.nativeElement
    let ctx = canvas.getContext('2d')

    this.map.coords.forEach(c => {
      ctx.strokeStyle="#FFFFFF";

      let arr = c.split(",").map(c => Number(c) + 1)

      ctx.beginPath();
      ctx.moveTo(arr[0], arr[1]);
      ctx.lineTo(arr[2], arr[3]);
      ctx.lineTo(arr[4], arr[5]);
      ctx.lineTo(arr[6], arr[7]);
      ctx.lineTo(arr[0], arr[1]);
      ctx.stroke();
    })

    this.canvasFilled = true
  }

  drawPoly(coord){
    if(!this.canvasFilled)
      this.fillCanvas()

    let arr = coord.split(",").map(c => Number(c))

    let canvas = this.canvasRef.nativeElement
    let ctx = canvas.getContext('2d')

    // ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "rgba(88, 214, 141, 0.5)";

    ctx.beginPath();
    ctx.moveTo(arr[0], arr[1]);
    ctx.lineTo(arr[2], arr[3]);
    ctx.lineTo(arr[4], arr[5]);
    ctx.lineTo(arr[6], arr[7]);
    ctx.lineTo(arr[0], arr[1]);
    ctx.fill();
  }

}
