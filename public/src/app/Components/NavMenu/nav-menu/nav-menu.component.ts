import { Component, OnInit } from '@angular/core';
import { Routes } from '../../../Routes/routes';
import {ApiService} from '../../../Api/api.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
    public routes = Routes;
    constructor(private api: ApiService) { }

    ngOnInit(): void {
    }
    logout() {
        this.api.logout();
    }
}
