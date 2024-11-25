export interface LibraryBook {
  authorKey: Array<string>;
  author: Array<string>;
  coverImageId: number;
  edition: number;
  firstPublishYear: number;
  key: string;
  title: string;
}

export interface LibraryResponseBook {
  author_key: Array<string>;
  author_name: Array<string>;
  cover_i: number;
  edition_count: number;
  first_publish_year: number;
  key: string;
  title: string;
}

export interface LibraryResponseData {
  start: number;
  num_found: number;
  docs: Array<LibraryResponseBook>;
}

export interface LibrarySearchParams {
  limit: number;
  offset: number;
  q: string;
}
