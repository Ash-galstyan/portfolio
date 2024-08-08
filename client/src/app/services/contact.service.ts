import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    constructor(private http: HttpClient) {}
    contactUrl: string = 'http://localhost:3000/send-email';

    submitForm(body): void {
        this.http.post(this.contactUrl, body).subscribe();
    }
}