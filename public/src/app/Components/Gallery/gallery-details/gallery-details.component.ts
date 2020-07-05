import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../Api/api.service';
import {ActivatedRoute} from '@angular/router';
import {GalleryDetailsModel} from '../../../Models/Gallery/GalleryDetailsModel';

@Component({
    selector: 'app-gallery-details',
    templateUrl: './gallery-details.component.html',
    styleUrls: ['./gallery-details.component.css']
})
export class GalleryDetailsComponent implements OnInit {
    public loading: boolean;
    public detailsModel: GalleryDetailsModel;
    constructor(private api: ApiService, private route: ActivatedRoute) { }

    async ngOnInit() {
        this.loading = true;
        this.detailsModel = await this.api.getGalleryDetails(this.route.snapshot.params.id).toPromise();
        this.loading = false;
    }

}
