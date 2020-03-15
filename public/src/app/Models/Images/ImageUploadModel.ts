export interface ImageUploadModel {
    images: ImageInfo[];
}

export interface ImageInfo {
    rawUrl: string;
    cropped150x150Url: string;
    cropped300x400Url: string;
}
