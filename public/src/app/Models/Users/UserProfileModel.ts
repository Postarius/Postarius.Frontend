import {UserPreviewModel} from './UserPreviewModel';

export interface UserProfileModel {
    login: string;
    email: string;
    displayName: string;
    id: number;
    avatarUrl: string;
    followers: UserPreviewModel[];
    followed: UserPreviewModel[];
}
