export interface GalleryDetailsModel {
    title: string;
    description: string;
    imageUrls: string[];
    author: AuthorModel;
}

export interface AuthorModel {
    id: number;
    displayName: number;
    followerCount: number;
}
