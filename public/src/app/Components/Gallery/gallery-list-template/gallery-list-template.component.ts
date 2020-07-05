import {Component, Input, OnInit} from '@angular/core';
import {PostPreviewModel} from '../../../Models/Posts/PostPreviewModel';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-gallery-list-template',
    templateUrl: './gallery-list-template.component.html',
    styleUrls: ['./gallery-list-template.component.css']
})
export class GalleryListTemplateComponent implements OnInit {
    @Input() posts: PostPreviewModel[];
    public routes = Routes;
    constructor() { }

    ngOnInit(): void {
    }

}
