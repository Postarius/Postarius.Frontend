import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../Api/api.service';
import {ToastrService} from 'ngx-toastr';
import {ImageInfo} from '../../../Models/Images/ImageUploadModel';

interface ImagePreviewModel {
    url: string;
    file: File;
    name: string;
    size: number;
}

@Component({
    selector: 'app-multi-image-upload',
    templateUrl: './multi-image-upload.component.html',
    styleUrls: ['./multi-image-upload.component.css']
})
export class MultiImageUploadComponent implements OnInit {
    public images: ImagePreviewModel[] = [];
    public imageUrls: ImageInfo[];
    anyNotUploadedImage: boolean;
    constructor(private api: ApiService,
                private toastr: ToastrService) { }

    ngOnInit(): void {
    }
    onImagesSelected(e: Event) {
        this.anyNotUploadedImage = true;
        const files = (e.target as HTMLInputElement).files;
        Array.from(files)
            .forEach(f => {
                const reader = new FileReader();
                const imageModel = {
                    file: f,
                    name: f.name,
                    size: f.size,
                    url: ''
                };
                reader.onload = (pe: ProgressEvent<FileReader>) => {
                    imageModel.url = pe.target.result as string;
                    this.images.push(imageModel);
                };
                reader.readAsDataURL(imageModel.file);
            });
    }
    uploadImages() {
        const formData = new FormData();
        this.images.forEach(i => formData.append('images', i.file));
        this.api.uploadImages(formData).subscribe(s => {
            this.imageUrls = s.images;
            this.toastr.success('Images uploaded successfully', 'Saved successfully');
        });
        this.anyNotUploadedImage = false;
    }
    removeAllImages() {
        this.images = [];
        this.anyNotUploadedImage = false;
    }
}
