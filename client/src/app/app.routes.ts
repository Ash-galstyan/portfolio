import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ResumePageComponent } from './resume-page/resume-page.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'projects-achievements',
        children: [
            {
                path: '',
                component: ProjectsComponent,
                data: {
                    isSeparatePage: true
                }
            },
            {
                path: ':id',
                component: ProjectDetailsComponent,
                data: {
                    isSeparatePage: true
                }
            }
        ]
    },
    {
        path: 'feedback',
        component: FeedbackComponent,
        data: {
            isSeparatePage: true
        }
    },
    {
        path: 'contact',
        component: ContactComponent,
        data: {
            isSeparatePage: true
        }
    },
    {
        path: 'resume',
        component: ResumePageComponent
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' }
];
