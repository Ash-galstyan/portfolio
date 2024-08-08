import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  })
  errorMessage = '';
  isSeparatePage: boolean;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
) {
    merge(this.contactForm.controls.email.statusChanges, this.contactForm.controls.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this.isSeparatePage = this.activatedRoute.snapshot.data['isSeparatePage'];
  }

  updateErrorMessage() {
    if (this.contactForm.controls.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.contactForm.controls.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  onSubmit() {
    this.contactService.submitForm(this.contactForm.value);
  }

}
