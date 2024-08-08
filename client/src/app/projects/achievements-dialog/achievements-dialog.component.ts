import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievements-dialog',
  standalone: true,
  imports: [],
  templateUrl: './achievements-dialog.component.html',
  styleUrl: './achievements-dialog.component.scss'
})
export class AchievementsDialogComponent {
    @Input() imagePath: string;

}
