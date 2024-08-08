import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    public scrollSubject$: BehaviorSubject<string>;
    
    constructor() {
        this.scrollSubject$ = new BehaviorSubject<string>('');
    }
}