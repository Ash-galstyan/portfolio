import { Component, Input, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { GradualTextDirective } from '../../directives/gradual-text.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-background-animation',
  templateUrl: './background-animation.component.html',
  styleUrls: ['./background-animation.component.scss'],
  imports: [GradualTextDirective],
  animations: [
    trigger('fadeInOut', [
        state('void', style({
          opacity: 0,
          visibility: 'hidden'
        })),
        transition('void => *', [
          animate(1000, style({
            opacity: 1,
            visibility: 'visible'
          }))
        ])
      ])
  ],
  standalone: true
})
export class BackgroundAnimationComponent implements AfterViewInit {
  @Input() hasLine: boolean = false;
  @Input() id: string = '';
  @ViewChild('animationWrapper', {static: true}) private animationWrapper: ElementRef<HTMLDivElement>;
  canvas;
  ctx;
  stars: any[] = []; // Array that contains the stars
  FPS = 60; // Frames per second
  x = 100; // Number of stars
  mouse: { x: number; y: number } = {
    x: 0,
    y: 0,
  }; // mouse location
  text: string;
  isComponentVisible: boolean = false;

  constructor() {
  }

  // Draw the scene
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.globalCompositeOperation = 'lighter';

    for (var i = 0, x = this.stars.length; i < x; i++) {
      var s = this.stars[i] as any;

      this.ctx.fillStyle = '#07303c';
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.fillStyle = '#82949a';
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    for (var i = 0, x = this.stars.length; i < x; i++) {
      var starI = this.stars[i] as any;
      this.ctx.moveTo(starI.x, starI.y);
      if (this.distance(this.mouse, starI) < 150 && this.hasLine) {
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
      }
      for (var j = 0, x = this.stars.length; j < x; j++) {
        var starII = this.stars[j] as any;
        if (this.distance(starI, starII) < 150 && this.hasLine) {
          //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
          this.ctx.lineTo(starII.x, starII.y);
        }
      }
    }
    this.ctx.lineWidth = 0.05;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  distance(point1, point2) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }

  // Update star locations

  update() {
    for (var i = 0, x = this.stars.length; i < x; i++) {
      var s = this.stars[i] as any;

      s.x += s.vx / this.FPS;
      s.y += s.vy / this.FPS;

      if (s.x < 0 || s.x > this.canvas.width) s.vx = -s.vx;
      if (s.y < 0 || s.y > this.canvas.height) s.vy = -s.vy;
    }
  }

  // Update and draw

  tick = () => {
    if (this && this.draw != undefined) {
      this.draw();
      this.update();
    }
    requestAnimationFrame(this.tick);
  };

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    if (this.animationWrapper) {
        const rect = this.animationWrapper.nativeElement.getBoundingClientRect();
        const topVisible = rect.top <= window.innerHeight;
        const bottomVisible = rect.bottom >= 0;
        this.isComponentVisible = topVisible && bottomVisible;
        if (this.isComponentVisible) {
            this.text = 'This is a background effect for my portfolio with some HTML :)';
        } else {
            this.text = '';
        }
    }
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById(this.id) as HTMLCanvasElement;
    // this.ctx = this.canvas.getContext('2d');
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    // for (var i = 0; i < this.x; i++) {
    //   this.stars.push({
    //     x: Math.random() * this.canvas.width,
    //     y: Math.random() * this.canvas.height,
    //     radius: Math.random() * 1 + 1,
    //     vx: Math.floor(Math.random() * 50) - 25,
    //     vy: Math.floor(Math.random() * 50) - 25,
    //   });
    // }
    // this.canvas.addEventListener('mousemove', (e) => {
    //   this.mouse.x = e.clientX;
    //   this.mouse.y = e.offsetY;
    // });
    // this.tick();
  }
}
