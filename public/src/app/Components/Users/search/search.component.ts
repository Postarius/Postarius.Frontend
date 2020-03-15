import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserPreviewModel} from '../../../Models/Users/UserPreviewModel';
import {ApiService} from '../../../Api/api.service';
import {SearchModel} from '../../../Models/Users/SearchParams';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    searchModel: SearchModel;
    loading: boolean;
    searching: boolean;
    constructor(private api: ApiService,
                private formBuilder: FormBuilder) {
        this.loading = false;
        this.searching = false;
    }

    async ngOnInit() {
        this.searchForm = this.formBuilder.group({
            skip: ['', Validators.required],
            take: [''],
            displayName: [''],
            login: [''],
            email: ['']
        });
        await this.search();
    }
    async search() {
        this.loading = true;
        this.searchModel = await this.api.searchUsers(this.searchForm.value).toPromise();
        this.loading = false;
    }
}
