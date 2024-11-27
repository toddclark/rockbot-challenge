import { createPinia, setActivePinia } from 'pinia';

import { DEFAULT_PAGING_LIMIT, useLibraryStore } from '@/stores/library.store.ts';

describe('library.store.ts', () => {
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useLibraryStore();
  });

  test('state', () => {
    expect(store.books).toEqual([]);
    expect(store.limit).toEqual(DEFAULT_PAGING_LIMIT);
    expect(store.offset).toEqual(0);
    expect(store.query).toEqual('');
    expect(store.total).toEqual(0);
    expect(store.updating).toBeFalsy();
  });

  test('getters', () => {
    expect(store.paging).toEqual({
      limit: DEFAULT_PAGING_LIMIT,
      offset: 0,
      total: 0
    });
    expect(store.searchParams).toEqual({
      limit: DEFAULT_PAGING_LIMIT,
      offset: 0,
      q: '',
    });

    store.setPaging(40, 111, 10);
    store.setQuery('abc');

    expect(store.paging).toEqual({
      limit: 10,
      offset: 40,
      total: 111
    });
    expect(store.searchParams).toEqual({
      limit: 10,
      offset: 40,
      q: 'abc',
    });
  });

  test('appendBooks', () => {
    const mock = [{ title: 'a' }, { title: 'b' }] as Array<any>;

    expect(store.books).toEqual([]);
    store.appendBooks(mock);
    expect(store.books).toEqual(mock);
    store.appendBooks(mock);
    expect(store.books).toEqual([...mock, ...mock]);
  });

  test('reset', () => {
    expect(store.books).toEqual([]);
    expect(store.limit).toEqual(DEFAULT_PAGING_LIMIT);
    expect(store.offset).toEqual(0);
    expect(store.query).toEqual('');
    expect(store.total).toEqual(0);

    const mockBooks = [{ title: 'a' }, { title: 'b' }] as Array<any>;
    store.appendBooks(mockBooks);
    store.setPaging(40, 111, 10);
    store.setQuery('abc');

    expect(store.books).toEqual(mockBooks);
    expect(store.limit).toEqual(10);
    expect(store.offset).toEqual(40);
    expect(store.query).toEqual('abc');
    expect(store.total).toEqual(111);

    store.reset();

    expect(store.books).toEqual([]);
    expect(store.limit).toEqual(DEFAULT_PAGING_LIMIT);
    expect(store.offset).toEqual(0);
    expect(store.query).toEqual('abc');
    expect(store.total).toEqual(0);

    store.appendBooks(mockBooks);
    store.setPaging(40, 111, 10);
    store.setQuery('abc');

    expect(store.books).toEqual(mockBooks);
    expect(store.limit).toEqual(10);
    expect(store.offset).toEqual(40);
    expect(store.query).toEqual('abc');
    expect(store.total).toEqual(111);

    store.reset(true);

    expect(store.books).toEqual([]);
    expect(store.limit).toEqual(DEFAULT_PAGING_LIMIT);
    expect(store.offset).toEqual(0);
    expect(store.query).toEqual('');
    expect(store.total).toEqual(0);
  });

  test('setBooks', () => {
    const mock = [{ title: 'a' }, { title: 'b' }] as Array<any>;

    expect(store.books).toEqual([]);
    store.setBooks(mock);
    expect(store.books).toEqual(mock);
  });

  test('setOffset', () => {
    expect(store.offset).toEqual(0);
    store.setOffset(123);
    expect(store.offset).toEqual(123);
  });

  test('setPaging', () => {
    expect(store.limit).toEqual(DEFAULT_PAGING_LIMIT);
    expect(store.offset).toEqual(0);
    expect(store.total).toEqual(0);

    store.setPaging(40, 111, 10);

    expect(store.limit).toEqual(10);
    expect(store.offset).toEqual(40);
    expect(store.total).toEqual(111);
  });

  test('setQuery', () => {
    expect(store.query).toEqual('');
    store.setQuery('abcd');
    expect(store.query).toEqual('abcd');
  });

  test('setUpdating', () => {
    expect(store.updating).toBeFalsy();

    store.setUpdating(true);
    expect(store.updating).toBeTruthy();

    // empty arguments default to false
    store.setUpdating();
    expect(store.updating).toBeFalsy();
  });
});
