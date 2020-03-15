import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Routes} from '../../Routes/routes';

@Component({
    selector: 'app-third-party-token-auth',
    templateUrl: './third-party-token-auth.component.html',
    styleUrls: ['./third-party-token-auth.component.css']
})
export class ThirdPartyTokenAuthComponent implements OnInit {
    private token: string;
    constructor(private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(p => {
                this.token = p.token;
                localStorage.setItem(environment.apiTokenKey, JSON.stringify({ token: this.token }));
                this.router.navigate([Routes.home]);
            });
    }

}
