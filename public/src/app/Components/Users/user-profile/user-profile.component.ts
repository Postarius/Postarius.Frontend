import { Component, OnInit } from '@angular/core';
import {UserProfileModel} from '../../../Models/Users/UserProfileModel';
import {ApiService} from '../../../Api/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../Api/auth.service';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    loading: boolean;
    userProfileData: UserProfileModel;
    constructor(private api: ApiService,
                private route: ActivatedRoute,
                private auth: AuthService,
                private router: Router) { }

    ngOnInit() {
        console.log(this.auth.currentUserValue.id);
        console.log(this.route.snapshot.params.id);
        if (this.auth.currentUserValue.id == this.route.snapshot.params.id) {
            this.router.navigate([Routes.myProfile]);
        }
        this.loadUserProfileData();
    }
    async loadUserProfileData() {
        this.loading = true;
        this.userProfileData = await this.api.getUserProfileData(parseInt(this.route.snapshot.params.id, 10)).toPromise();
        this.loading = false;
    }
}
