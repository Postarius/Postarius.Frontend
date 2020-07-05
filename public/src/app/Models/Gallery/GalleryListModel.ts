export interface GalleryListModel {
    posts: GalleryPreviewModel[];
}

export interface GalleryPreviewModel {
    title: string;
    description: string;
    primaryImageUrl: string;
    id: number;
}
