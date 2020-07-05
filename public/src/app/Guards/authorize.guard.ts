import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ApiService} from '../Api/api.service';
import {Routes} from '../Routes/routes';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
    constructor(private api: ApiService, private router: Router) {
    }
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const currentUser = this.api.currentUserValue;
        if (currentUser) {
            const check = await this.api
                .check()
                .toPromise()
                .then(res => {
                    return true;
                })
                .catch(err => {
                    localStorage.removeItem(environment.apiTokenKey);
                    return false;
                });

            if (!check) {
                this.router.navigate([Routes.login]);
            }
            return check;
        }

        this.router.navigate([Routes.login]);
        return false;
    }
}
