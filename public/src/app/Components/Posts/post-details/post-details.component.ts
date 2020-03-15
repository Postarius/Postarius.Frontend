import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../Api/api.service';
import {PostDetailsModel} from '../../../Models/Posts/PostDetailsModel';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
    postDetails: PostDetailsModel;
    loading: boolean;
    constructor(private route: ActivatedRoute,
                private api: ApiService) { }

    async ngOnInit() {
        this.loading = true;
        this.postDetails = await this.api.getPostDetails(parseInt(this.route.snapshot.params.id, 10)).toPromise();
        this.loading = false;
    }

}
