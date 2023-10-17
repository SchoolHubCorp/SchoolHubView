import { Injectable } from "@angular/core";
import * as roles from '../../../stub/roles.json';
import { Observable, Subject, Subscription, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EntrancePagesService {
    private readonly chosenRole: Subject<string> = new Subject<string>;
    public role$: Observable<string> = this.chosenRole.asObservable();

    data: string[] = roles;

    getSchoolInfo(): Observable<string[]> {
        return of(this.data);
    }

    emitChosenRole(role: string): void {
        this.chosenRole.next(role);
    }
}