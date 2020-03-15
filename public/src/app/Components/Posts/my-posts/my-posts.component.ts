import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../Api/api.service';
import {PostListModel, PostStatus} from '../../../Models/Posts/PostListModel';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
    postPreviews: PostListModel;
    loading: boolean;
    routes = Routes;
    status: PostStatus;
    constructor(private api: ApiService) { }

    ngOnInit() {
        this.loadPosts();
    }
    async loadPosts(status?: PostStatus) {
        this.loading = true;
        const postListModel = await this.api.getPosts(status).toPromise();
        this.postPreviews = postListModel;
        this.loading = false;
    }
    filterByStatus(status?: PostStatus) {
        this.api.getPosts(status).subscribe(s => {
            this.postPreviews = s;
        });
    }
}
