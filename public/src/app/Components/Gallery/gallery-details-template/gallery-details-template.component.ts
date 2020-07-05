import {Component, Input, OnInit} from '@angular/core';
import {GalleryDetailsModel} from '../../../Models/Gallery/GalleryDetailsModel';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-gallery-details-template',
    templateUrl: './gallery-details-template.component.html',
    styleUrls: ['./gallery-details-template.component.css']
})
export class GalleryDetailsTemplateComponent implements OnInit {
    @Input() detailsModel: GalleryDetailsModel;
    public routes = Routes;
    constructor() { }

    ngOnInit(): void {
    }

}
