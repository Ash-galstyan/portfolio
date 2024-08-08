import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Project } from '../constants/project';
import { ProjectsService } from '../services/projects.service';
import { AchievementsDialogComponent } from './achievements-dialog/achievements-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    ProjectDetailsComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  isSeparatePage: boolean;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute
) {}

  ngOnInit(): void {
    this.projects = this.projectsService.projects;
    this.isSeparatePage = this.activatedRoute.snapshot.data['isSeparatePage'];
  }

  openDialog(path: string) {
    const dialogRef = this.dialog.open(AchievementsDialogComponent, {width: '720px'});
    dialogRef.componentInstance.imagePath = path;
  }

  goToProjectPage(projectId: number) {
    this.router.navigate([`/projects-achievements/${projectId}`])
  }
}
