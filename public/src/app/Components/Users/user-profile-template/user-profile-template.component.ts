import {Component, Input, OnInit} from '@angular/core';
import {UserProfileModel} from '../../../Models/Users/UserProfileModel';
import {Routes} from '../../../Routes/routes';
import {ApiService} from '../../../Api/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-user-profile-template',
    templateUrl: './user-profile-template.component.html',
    styleUrls: ['./user-profile-template.component.css']
})
export class UserProfileTemplateComponent implements OnInit {
    @Input() userProfileData: UserProfileModel;
    isMyProfile: boolean;
    alreadyFollowing: boolean;
    routes = Routes;
    constructor(private api: ApiService,
                private toastr: ToastrService) {
        this.isMyProfile = window.location.href.indexOf(Routes.myProfile) > -1;
        this.alreadyFollowing = false;
    }

    async ngOnInit() {
        if (!this.isMyProfile) {
            this.alreadyFollowing = await this.api.alreadyFollowing(this.userProfileData.id).toPromise();
            console.log(this.alreadyFollowing);
        } else {
            this.alreadyFollowing = true;
        }
        console.log(this.userProfileData);
    }
    async followUser() {
        await this.api.followUser(this.userProfileData.id).toPromise();
        this.alreadyFollowing = true;
        this.toastr.success('Success!');
    }
}
