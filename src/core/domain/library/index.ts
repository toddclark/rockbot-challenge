import type {
  LibraryBook,
  LibraryResponseBook,
  LibraryResponseData
} from './library-types.ts';

import { search as searchWeb } from './library-web.ts';

import { useLibraryStore } from '@/stores/library.store.ts';

const cleanBook = (book: LibraryResponseBook): LibraryBook => {
  return {
    authorKey: Array.isArray(book.author_key) ? book.author_key : [],
    author: Array.isArray(book.author_name) ? book.author_name : [],
    coverImageId: book.cover_i ?? -1,
    edition: book.edition_count ?? 1,
    firstPublishYear: book?.first_publish_year,
    key: book?.key,
    title: book?.title ?? ''
  };
};

export const search = async (query = '', offset = 0) => {
  const store = useLibraryStore();

  const cleanQuery = query.trim().replace(/\s+/g, '+');
  const cleanStoredQuery = store.query.trim().replace(/\s+/g, '+');

  if(cleanQuery.length < 3) {
    store.reset();
    return;
  }

  const offsetStable = offset === store.offset;
  const queryStable = cleanQuery === cleanStoredQuery;

  // do NOT search when the user is changing whitespace
  if (offsetStable && queryStable) return;

  store.setUpdating(true);

  store.setQuery(query);
  store.setOffset(queryStable ? offset : 0);

  try {
    const { data }: {
      data: LibraryResponseData | null;
      response: any;
    } = await searchWeb(store.searchParams);

    store.setPaging(
      data?.start ?? 0,
      data?.num_found ?? 0
    );

    const books: Array<LibraryResponseBook> = data?.docs ?? [];
    const updatedBooks = books.map(cleanBook);

    store.setBooks(updatedBooks);
  } catch (ex: unknown) {
    console.error('library::index::search -', ex);
  }

  store.setUpdating(false);
};
