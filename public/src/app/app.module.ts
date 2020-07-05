import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/NavMenu/nav-menu/nav-menu.component';
import { HomeComponent } from './Components/home/home.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { UserProfileTemplateComponent } from './Components/Users/user-profile-template/user-profile-template.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtTokenInterceptor} from './Api/jwt-token-interceptor';
import {AuthorizeGuard} from './Guards/authorize.guard';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyProfileComponent } from './Components/Users/my-profile/my-profile.component';
import { UsersTableComponent } from './Components/Users/users-table/users-table.component';
import { FollowersTableComponent } from './Components/Users/followers-table/followers-table.component';
import { SearchComponent } from './Components/Users/search/search.component';
import { ThirdPartyTokenAuthComponent } from './Components/third-party-token-auth/third-party-token-auth.component';
import {UserProfileComponent} from './Components/Users/user-profile/user-profile.component';
import { SideManuComponent } from './Components/NavMenu/side-manu/side-manu.component';
import { PostListTemplateComponent } from './Components/Posts/post-list-template/post-list-template.component';
import { MyPostsComponent } from './Components/Posts/my-posts/my-posts.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { BasicLayoutComponent } from './Components/basic-layout/basic-layout.component';
import {SidebarModule} from 'ng-sidebar';
import { CreatePostComponent } from './Components/Posts/create-post/create-post.component';
import { MultiImageUploadComponent } from './Components/Images/multi-image-upload/multi-image-upload.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { PostDetailsTemplateComponent } from './Components/Posts/post-details-template/post-details-template.component';
import { PostDetailsComponent } from './Components/Posts/post-details/post-details.component';
import { RegisterComponent } from './Components/register/register.component';
import { GalleryListTemplateComponent } from './Components/Gallery/gallery-list-template/gallery-list-template.component';
import { GalleryListComponent } from './Components/Gallery/gallery-list/gallery-list.component';
import { GalleryDetailsTemplateComponent } from './Components/Gallery/gallery-details-template/gallery-details-template.component';
import { GalleryDetailsComponent } from './Components/Gallery/gallery-details/gallery-details.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LayoutComponent,
        UserProfileTemplateComponent,
        LoginComponent,
        MyProfileComponent,
        UsersTableComponent,
        FollowersTableComponent,
        SearchComponent,
        ThirdPartyTokenAuthComponent,
        UserProfileComponent,
        SideManuComponent,
        PostListTemplateComponent,
        MyPostsComponent,
        LoadingComponent,
        BasicLayoutComponent,
        CreatePostComponent,
        MultiImageUploadComponent,
        PostDetailsTemplateComponent,
        PostDetailsComponent,
        RegisterComponent,
        GalleryListTemplateComponent,
        GalleryListComponent,
        GalleryDetailsTemplateComponent,
        GalleryDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SidebarModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtTokenInterceptor,
        multi: true
    },
        AuthorizeGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
