import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ApiService} from './api.service';

interface IUser {
    login: string;
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<IUser>;
    public currentUser: Observable<IUser>;
    constructor(private api: ApiService) {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem(environment.apiTokenKey)));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): IUser {
        return this.currentUserSubject?.value;
    }
}
