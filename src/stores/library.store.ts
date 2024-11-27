import { acceptHMRUpdate, defineStore } from 'pinia';

import type { LibraryBook, LibrarySearchParams } from '@/core/domain/library/library-types';

interface ModuleState {
  books: Array<LibraryBook>,
  limit: number,
  offset: number,
  query: string,
  total: number,
  updating: boolean,
}

export const DEFAULT_PAGING_LIMIT = 20;

export const useLibraryStore = defineStore('library', {
  state: (): ModuleState => ({
    books: [],
    limit: DEFAULT_PAGING_LIMIT,
    offset: 0,
    query: '',
    total: 0,
    updating: false,
  }),

  getters: {
    paging: (state) => ({
      limit: state.limit,
      offset: state.offset,
      total: state.total
    }),
    searchParams: (state): LibrarySearchParams => ({
      limit: state.limit,
      offset: state.offset,
      q: `${state.query ?? ''}`.trim().replace(/\s+/g, '+'),
    }),
  },

  actions: {
    appendBooks(books: Array<LibraryBook>) {
      this.books = [...this.books, ...books];
    },
    reset(updateQuery = false) {
      this.books = [];
      this.limit = DEFAULT_PAGING_LIMIT;
      this.offset = 0;
      this.total = 0;

      if (updateQuery) {
        this.query = '';
      }
    },
    setBooks(books: Array<LibraryBook>) {
      this.books = [...books];
    },
    setOffset(offset: number) {
      this.offset = offset >= 0 ? offset : 0;
    },
    setPaging(offset: number, total: number, limit = 0) {
      if (limit > 0) {
        this.limit = limit;
      }

      this.offset = offset;
      this.total = total >= 0 ? total : 0;
    },
    setQuery(query: string) {
      this.query = query;
    },
    setUpdating(isUpdating = false) {
      this.updating = isUpdating;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLibraryStore as any, import.meta.hot));
}
