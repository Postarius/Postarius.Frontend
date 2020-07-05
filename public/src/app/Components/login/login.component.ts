import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {ApiService} from '../../Api/api.service';
import {Routes} from '../../Routes/routes';
import {filter, first, pairwise} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading = false;
    public submitted = false;
    private returnUrl: string;
    public error = '';
    public routes = Routes;
    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private api: ApiService) {
        if (this.api.currentUserValue) {
            this.router.navigate([Routes.home]);
        }

        this.router
            .events
            .pipe(filter((evt: any) => evt instanceof NavigationEnd), pairwise())
            .subscribe((events: RoutesRecognized[]) => {
                this.returnUrl = events[0].urlAfterRedirects;
            });
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.api.login(this.f.login.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                res => {
                    window.location.href = this.returnUrl || '';
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
}
