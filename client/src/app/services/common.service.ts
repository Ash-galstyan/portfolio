import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    generateRandomId(base): string {
        const now = new Date().getTime();
        const random = Math.floor(Math.random() * 100000);
        return base + now + random;
    }
}