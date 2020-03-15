import { Component, OnInit } from '@angular/core';
import {UserProfileModel} from '../../../Models/Users/UserProfileModel';
import {ApiService} from '../../../Api/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    loading: boolean;
    userProfileData: UserProfileModel;
    constructor(private api: ApiService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.loadUserProfileData();
    }
    async loadUserProfileData() {
        this.loading = true;
        this.userProfileData = await this.api.getUserProfileData(parseInt(this.route.snapshot.params.id, 10)).toPromise();
        this.loading = false;
    }
}
