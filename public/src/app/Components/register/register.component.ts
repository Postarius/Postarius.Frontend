import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Routes} from '../../Routes/routes';
import {ApiService} from '../../Api/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public loading = false;
    public submitted = false;
    public error = '';
    public routes = Routes;
    constructor(private formBuilder: FormBuilder,
                private api: ApiService,
                private router: Router) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
            displayName: ['', Validators.required],
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
            ])
        });
    }
    onSubmit() {
        this.submitted = true;
        this.loading = true;
        if (this.registerForm.invalid) {
            return;
        }

        const data = {
            login: this.f.login.value,
            password: this.f.password.value,
            displayName: this.f.displayName.value,
            email: this.f.email.value
        };

        this.api.register(data).subscribe(() => {
            this.loading = false;
            this.router.navigate([this.routes.myProfile]);
        });
    }
    get f() { return this.registerForm.controls; }
}
