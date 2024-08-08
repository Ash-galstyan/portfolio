import { Component, OnInit } from '@angular/core';
import { ContactInfoComponent } from '../contact-info/contact-info.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactInfoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
    year: number;

    ngOnInit(): void {
        this.year = new Date().getFullYear();
    }

}
