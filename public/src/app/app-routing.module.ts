import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {AuthorizeGuard} from './Guards/authorize.guard';
import {Routes as routeList} from './Routes/routes';
import {LoginComponent} from './Components/login/login.component';
import {MyProfileComponent} from './Components/Users/my-profile/my-profile.component';
import {FollowersTableComponent} from './Components/Users/followers-table/followers-table.component';
import {ThirdPartyTokenAuthComponent} from './Components/third-party-token-auth/third-party-token-auth.component';
import {SearchComponent} from './Components/Users/search/search.component';
import {UserProfileComponent} from './Components/Users/user-profile/user-profile.component';
import {BasicLayoutComponent} from './Components/basic-layout/basic-layout.component';
import {LayoutComponent} from './Components/layout/layout.component';
import {MyPostsComponent} from './Components/Posts/my-posts/my-posts.component';
import {CreatePostComponent} from './Components/Posts/create-post/create-post.component';
import {MultiImageUploadComponent} from './Components/Images/multi-image-upload/multi-image-upload.component';
import {PostDetailsComponent} from './Components/Posts/post-details/post-details.component';

const layoutRoutes: Routes = [
    {path: routeList.home, pathMatch: 'full', component: HomeComponent},
    {path: routeList.userProfile, pathMatch: 'full', component: UserProfileComponent},
    {path: routeList.myProfile, pathMatch: 'full', component: MyProfileComponent},
    {path: routeList.followers, pathMatch: 'full', component: FollowersTableComponent},
    {path: routeList.searchUsers, pathMatch: 'full', component: SearchComponent},
    {path: routeList.myPosts, pathMatch: 'full', component: MyPostsComponent},
    {path: routeList.createPost, pathMatch: 'full', component: CreatePostComponent},
    {path: routeList.uploadImage, pathMatch: 'full', component: MultiImageUploadComponent},
    {path: routeList.postDetails, pathMatch: 'full', component: PostDetailsComponent}
];

const routes: Routes = [
    {path: '', component: LayoutComponent, children: layoutRoutes, canActivate: [AuthorizeGuard]},
    {path: '', pathMatch: 'full', component: LayoutComponent},
    {path: routeList.login, pathMatch: 'full', component: BasicLayoutComponent, children: [
            {path: '', component: LoginComponent},
            {path: routeList.thirdPartyAuth, component: ThirdPartyTokenAuthComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
