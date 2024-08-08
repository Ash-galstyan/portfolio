import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './resume-page.component.html',
  styleUrl: './resume-page.component.scss'
})
export class ResumePageComponent {
    downloadResume(): void {
        const link = document.createElement('a');
        link.href = 'assets/Ashot_Galstyan_resume.pdf';
        link.download = 'Ashot_Galstyan_resume.pdf';
        link.click();
    }

}
