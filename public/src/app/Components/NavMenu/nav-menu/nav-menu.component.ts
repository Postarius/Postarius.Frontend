import { Component, OnInit } from '@angular/core';
import { Routes } from '../../../Routes/routes';
import {ApiService} from '../../../Api/api.service';
import {AuthService} from '../../../Api/auth.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
    public routes = Routes;
    public loggedIn: boolean;
    public loggedInAs: string;
    constructor(private api: ApiService, private auth: AuthService) {
        this.loggedIn = this.auth.currentUserValue != null;
        if (this.loggedIn) {
            console.log(this.auth.currentUserValue);
            this.loggedInAs = this.auth.currentUserValue.login;
        }
    }

    ngOnInit(): void {
    }
    logout() {
        this.api.logout();
    }
}
