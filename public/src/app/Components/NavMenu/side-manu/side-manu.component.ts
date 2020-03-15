import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Routes } from '../../../Routes/routes';

@Component({
    selector: 'app-side-manu',
    templateUrl: './side-manu.component.html',
    styleUrls: ['./side-manu.component.css']
})
export class SideManuComponent implements OnInit {
    @Input() toggleSidebar: () => void;
    routes = Routes;
    constructor() {
    }

    ngOnInit(): void {
    }
}
