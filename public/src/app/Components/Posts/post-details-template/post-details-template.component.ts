import {Component, Input, OnInit} from '@angular/core';
import {PostDetailsModel} from '../../../Models/Posts/PostDetailsModel';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-post-details-template',
    templateUrl: './post-details-template.component.html',
    styleUrls: ['./post-details-template.component.css']
})
export class PostDetailsTemplateComponent implements OnInit {
    @Input() postDetailsModel: PostDetailsModel;
    routes = Routes;
    constructor() { }

    ngOnInit(): void {
    }

}
