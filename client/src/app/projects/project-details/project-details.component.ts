import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../constants/project';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    destroyed$ = new Subject<void>();
    currentScreenSize!: string;
    displayNameMap = new Map([
        [Breakpoints.XSmall, 'XSmall'],
        [Breakpoints.Small, 'Small'],
        [Breakpoints.Medium, 'Medium'],
        [Breakpoints.Large, 'Large'],
        [Breakpoints.XLarge, 'XLarge'],
    ]);
    project: Project;
    imgColSpan: number;
    imgRowSpan: number;
    projectInfoRowSpan: number = 4;
    projectInfoColSpan: number;
    isScreenMobile = false;

    constructor(
        private projectsService: ProjectsService,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver
    ) {
        
    }

    ngOnInit(): void {
        const project = this.projectsService.getProjectById(+this.activatedRoute.snapshot.params['id']);
        if (project) {
            this.project = project
        }

        this.imgRowSpan = 4;
        this.breakpointObserver
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
                    this.isScreenMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
                    if (this.isScreenMobile) {
                        this.imgColSpan = 5;
                        this.imgRowSpan = 2;
                        this.projectInfoColSpan = 5;
                        this.projectInfoRowSpan = 2;
                    } else {
                        this.imgColSpan = 3;
                        this.projectInfoColSpan = 2;
                    }
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
