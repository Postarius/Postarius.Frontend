import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MultiImageUploadComponent} from '../../Images/multi-image-upload/multi-image-upload.component';
import {ApiService} from '../../../Api/api.service';
import {PostCreateModel} from '../../../Models/Posts/PostCreateModel';
import {Router} from '@angular/router';
import {Routes} from '../../../Routes/routes';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
    @ViewChild(MultiImageUploadComponent) imageUploader;
    public formGroup: FormGroup;
    loading: boolean;
    constructor(private formBuilder: FormBuilder,
                private api: ApiService,
                private router: Router) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['']
        });
    }
    async save() {
        this.loading = true;
        await this.api.savePost(this.getPostData()).toPromise();
        this.loading = false;
        this.router.navigate([Routes.myPosts]);
    }
    async saveAndFinalize() {
        this.loading = true;
        await this.api.saveAndFinalizePost(this.getPostData()).toPromise();
        this.loading = false;
        this.router.navigate([Routes.myPosts]);
    }
    getPostData(): PostCreateModel {
        const form = this.formGroup.value;
        const post = {
            description: form.description,
            title: form.title,
            imageUrls: this.imageUploader.imageUrls.map(i => i.rawUrl)
        };
        return post;
    }
}
