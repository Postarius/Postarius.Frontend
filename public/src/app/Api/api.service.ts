import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Routes} from '../Routes/routes';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserProfileModel} from '../Models/Users/UserProfileModel';
import {UserPreviewModel} from '../Models/Users/UserPreviewModel';
import {SearchModel, SearchParams} from '../Models/Users/SearchParams';
import {PostListModel, PostStatus} from '../Models/Posts/PostListModel';
import {PostDetailsModel} from '../Models/Posts/PostDetailsModel';
import {ImageUploadModel} from '../Models/Images/ImageUploadModel';
import {PostCreateModel} from '../Models/Posts/PostCreateModel';

interface ILoginModel {
    token: string;
    returnUrl: string;
}

interface IUser {
    login: string;
    id: number;
    token: string;
}

interface IFollowersModel {
    followers: UserPreviewModel[];
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private currentUserSubject: BehaviorSubject<IUser>;
    private currentUser: Observable<IUser>;
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem(environment.apiTokenKey)));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public login(login: string, password: string) {
        const body = {
            login,
            password
        };

        return this.http.post<any>(`${environment.backendUrl}/api/authorize`, body)
            .pipe(map(res => {
                localStorage.setItem(environment.apiTokenKey, JSON.stringify(res));
                return res;
            }));
    }
    public check(): Observable<any> {
        return this.http.get(`${environment.backendUrl}/api/authorize/check`);
    }
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }
    public logout() {
        localStorage.removeItem(environment.apiTokenKey);
        this.currentUserSubject.next(null);
        this.router.navigate([Routes.login]);
    }
    public getUserProfileData(id: number): Observable<UserProfileModel> {
        return this.http.get<UserProfileModel>(`${environment.backendUrl}/api/users/profile/${id}`);
    }
    public getMyUserProfileData(): Observable<UserProfileModel> {
        return this.http.get<UserProfileModel>(`${environment.backendUrl}/api/users/myProfile`);
    }
    public getFollowers(): Observable<IFollowersModel> {
        return this.http.get<IFollowersModel>(`${environment.backendUrl}/api/users/profile/followers`);
    }
    public alreadyFollowing(id: number): Observable<boolean> {
        const queryParams = new HttpParams().append('userId', id.toString());
        return this.http.get<boolean>(`${environment.backendUrl}/api/users/alreadyFollowing`, { params: queryParams });
    }
    public getPostDetails(id: number): Observable<PostDetailsModel> {
        return this.http.get<PostDetailsModel>(`${environment.backendUrl}/api/posts/details/${id}`);
    }
    public getPosts(status?: PostStatus): Observable<PostListModel> {
        let queryParams = new HttpParams();
        if (status) {
            queryParams = queryParams.append('status', status.toString());
        }
        return this.http.get<PostListModel>(`${environment.backendUrl}/api/posts`, { params: queryParams });
    }
    public uploadImages(form: FormData): Observable<ImageUploadModel> {
        return this.http.post<ImageUploadModel>(`${environment.backendStaticFilesUrl}/api/images/upload`, form);
    }
    public savePost(post: PostCreateModel): Observable<PostCreateModel> {
        return this.http.post<PostCreateModel>(`${environment.backendUrl}/api/posts/create`, post);
    }
    public saveAndFinalizePost(post: PostCreateModel): Observable<PostCreateModel> {
        return this.http.post<PostCreateModel>(`${environment.backendUrl}/api/posts/createAndFinalize`, post);
    }
    public followUser(userId: number): Observable<any> {
        return this.http.post(`${environment.backendUrl}/api/users/follow`, { userToFollowId : userId });
    }
    public searchUsers(searchParams: SearchParams): Observable<SearchModel> {
        let query = new HttpParams();
        const skip = searchParams.skip?.toString(10);
        const take = searchParams.take?.toString(10);
        const login = searchParams.login;
        const email = searchParams.email;
        const displayName = searchParams.displayName;
        if (skip) {
            query = query.append('skip', skip);
        }
        if (take) {
            query = query.append('take', take);
        }
        if (login) {
            query = query.append('login', login);
        }
        if (email) {
            query = query.append('email', email);
        }
        if (displayName) {
            query = query.append('displayName', displayName);
        }

        return this.http.get<SearchModel>(`${environment.backendUrl}/api/users/list`,  { params : query });
    }
}
