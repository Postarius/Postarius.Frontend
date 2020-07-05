import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../Api/api.service';
import {PostListModel} from '../../../Models/Posts/PostListModel';

@Component({
    selector: 'app-gallery-list',
    templateUrl: './gallery-list.component.html',
    styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
    public loading: boolean;
    public postModel: PostListModel;
    constructor(private api: ApiService) {
        this.loading = false;
    }

    async ngOnInit() {
        this.loading = true;
        this.postModel = await this.api.getGalleryPosts().toPromise();
        console.log(this.postModel);
        this.loading = false;
    }

}
