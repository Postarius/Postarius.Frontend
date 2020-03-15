import {UserPreviewModel} from './UserPreviewModel';

export interface SearchParams {
  skip: number;
  take: number;
  displayName: string;
  login: string;
  email: string;
}

export interface SearchModel {
  userInfos: UserPreviewModel[];
  searchParams: SearchParams;
  totalPageCount: number;
  totalEntries: number;
  pageNumber: number;
}
