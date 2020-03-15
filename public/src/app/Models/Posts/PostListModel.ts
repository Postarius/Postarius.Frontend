import {PostPreviewModel} from './PostPreviewModel';

export interface PostListModel {
    posts: PostPreviewModel[];
}

export enum PostStatus {
    InProgress = 0,
    Finalized = 1,
    Approved = 10,
    Disapproved = 11
}
