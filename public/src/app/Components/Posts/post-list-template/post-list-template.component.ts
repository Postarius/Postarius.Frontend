import {Component, Input, OnInit} from '@angular/core';
import {PostListModel} from '../../../Models/Posts/PostListModel';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-post-list-template',
    templateUrl: './post-list-template.component.html',
    styleUrls: ['./post-list-template.component.css']
})
export class PostListTemplateComponent implements OnInit {
    @Input() postListModel: PostListModel;
    routes = Routes;
    constructor() { }

    ngOnInit(): void {
    }

}
