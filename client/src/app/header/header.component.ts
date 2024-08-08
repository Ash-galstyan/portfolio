import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fixedPosition', [
      state('false', style({
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%'
      })),
      state('true', style({
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%'
      })),
      transition('false => true', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('700ms ease-in-out', style({ position: 'fixed', opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition('true => false', [
        animate('700ms ease-in-out', style({ position: 'absolute' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnDestroy {
  @Output() scrollToSection = new EventEmitter<string>();
  @ViewChild('menuIcon') menuIcon: ElementRef;
  destroyed$ = new Subject<void>();

  currentScreenSize!: string;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  logoSrc: string = '../../assets/images/icons/ag.png';
  portfolioName: string = 'Ashot Galstyan';
  showFiller = true;
  sections: string[] = [
    'Home',
    'About me',
    'Skills',
    'Projects',
    'Achievements',
    'Feedback',
    'Contact'
  ];
  isScreenMobile = false;
  state = 'visible';
  lastScrollTop = 0;
  isNavbarFixed = false;
  isHamburguer = true;

  constructor(
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private scrollService: ScrollService
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

  scrollTo(sectionId: string): void {
    this.scrollService.scrollSubject$.next(sectionId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbarHeight = document.getElementById('navbar-wrapper')?.offsetHeight;
    if (navbarHeight && window.pageYOffset > navbarHeight) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.classList.contains('mat-icon')) {
        this.isHamburguer = true;
    }
  }

  onClick() {
    this.isHamburguer = !this.isHamburguer;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
