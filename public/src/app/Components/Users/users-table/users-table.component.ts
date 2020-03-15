import {Component, Input, OnInit} from '@angular/core';
import {Routes} from '../../../Routes/routes';
import {SearchModel} from '../../../Models/Users/SearchParams';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
    @Input() searchModel: SearchModel;
    public routes = Routes;
    constructor() { }

    ngOnInit(): void {
    }

}
