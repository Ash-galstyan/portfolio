import {
    AfterViewInit,
    Component,
    HostListener,
    OnDestroy,
    OnInit
} from '@angular/core';
import { GradualTextDirective } from '../directives/gradual-text.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ContactComponent } from '../contact/contact.component';
import { BackgroundAnimationComponent } from './background-animation/background-animation.component';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../services/common.service';
import { MatButtonModule } from '@angular/material/button';
import { ViewportScroller } from '@angular/common';
import { ScrollService } from '../services/scroll.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GradualTextDirective,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    FeedbackComponent,
    ContactComponent,
    BackgroundAnimationComponent,
    MatButtonModule,
    RouterModule
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('void => *', [
        animate(2000, style({
          opacity: 1,
          visibility: 'visible'
        }))
      ])
    ]),
    trigger('slideUp', [
      state('void', style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(50%)'
      })),
      transition('void => *', [
        animate('2000ms ease-out', style({
          opacity: 1,
          visibility: 'visible',
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('slideLeft', [
        transition(':enter', [
            style({
                transform: 'translateX(50%)',
                opacity: 0,
                visibility: 'hidden'
            }),
            animate('1000ms ease-out', style({
                transform: 'translateX(0)',
                opacity: 1,
                visibility: 'visible'
            }))
        ])
    ]),
    trigger('slideRight', [
      state('void', style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateX(-40%)'
      })),
      transition('void => *', [
        animate('1500ms ease-out', style({
          opacity: 1,
          visibility: 'visible',
          transform: 'translateX(100)'
        }))
      ])
    ]),
    trigger('scrollAnimation', [
      transition(':enter', []),
      transition('* => scroll', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('2000ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private router: Router,
        public commonService: CommonService,
        private scrollService: ScrollService,
        breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver
        .observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge,
        ])
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
            for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
                this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
                this.isScreenMobile = breakpointObserver.isMatched('(max-width: 599px)');
            }
            }
        });
    }

    destroyed$ = new Subject<void>();
    currentScreenSize!: string;
    displayNameMap = new Map([
        [Breakpoints.XSmall, 'XSmall'],
        [Breakpoints.Small, 'Small'],
        [Breakpoints.Medium, 'Medium'],
        [Breakpoints.Large, 'Large'],
        [Breakpoints.XLarge, 'XLarge'],
    ]);
    portfolioName: string;
    title = 'Ashot Galstyan';
    introTitle: string = "a frontend web developer based in Yerevan, Armenia.";
    introText: string = "Welcome to my portfolio website where you may find some general information about me and my skills. I am a seasoned professional with a passion for crafting digital experiences"
    textAnimationComplete: boolean = false;
    isImageLoaded: boolean = false;
    canvasId: string = this.commonService.generateRandomId('main-bg');
    isScreenMobile = false;
    private navbarHeight: number;

    ngOnInit(): void {
        this.scrollService.scrollSubject$.subscribe((sectionId: string) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const elementPosition = element.offsetTop;
                const offsetPosition = elementPosition - this.navbarHeight;
                element.scrollIntoView({behavior: 'smooth'})
            }
        })

        this.portfolioName = 'Ashot Galstyan';
    }

    ngAfterViewInit(): void {
        const navbar = document.getElementById('navbar-wrapper');
        if (navbar) {
            this.navbarHeight = navbar.offsetHeight;
        }
    }

    onAnimationComplete() {
        this.textAnimationComplete = true;
    }

    animateTexts() {
        this.isImageLoaded = true;
    }

    goToContactPage() {
        this.router.navigate(['/contact'])
    }

    scrollTo(elementId: string, event: Event): void {
        event.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    @HostListener('window:load')
    @HostListener('window:resize')
    updateNavbarHeight() {
        const navbar = document.getElementById('navbar-wrapper');
        if (navbar) {
            this.navbarHeight = navbar.offsetHeight;
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
