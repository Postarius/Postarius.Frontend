import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    opened: boolean;
    public toggleSidebar: () => void;
    constructor() {
        this.opened = false;
        this.toggleSidebar = this.toggleSidebarInner.bind(this);
    }

    ngOnInit(): void {
    }
    private toggleSidebarInner() {
        this.opened = !this.opened;
    }
}
