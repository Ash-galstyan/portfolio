import { Component, OnInit } from '@angular/core';
import { BackgroundAnimationComponent } from '../home/background-animation/background-animation.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BackgroundAnimationComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  canvasId: string = this.commonService.generateRandomId('about-bg');

  ngOnInit(): void {
      
  }
}
