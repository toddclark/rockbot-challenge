import { createPinia, setActivePinia } from 'pinia';
import { useLibraryStore } from '@/stores/library.store.ts';

const { search } = vi.hoisted(() => ({ search: vi.fn() }));
vi.mock('@/core/domain/library/library-web', () => ({ search }));

import {
  cleanBook,
  search as searchFunction
} from '@/core/domain/library';

describe('library', () => {
  test('cleanBook', () =>{
    expect(cleanBook({
      author_key: ['ak1', 'ak2'],
      author_name : ['an1', 'an2'],
      cover_i: 456,
      edition_count: 123,
      first_publish_year: 1983,
      key: 'abc123',
      title: 'book title 1'
    })).toEqual({
      author: ['an1', 'an2'],
      authorKey: ['ak1', 'ak2'],
      coverImageId: 456,
      edition: 123,
      firstPublishYear: 1983,
      key: 'abc123',
      title: 'book title 1'
    });

    expect(cleanBook({
      author_key: undefined as any,
      author_name : undefined as any,
      cover_i: undefined as any,
      edition_count: undefined as any,
      first_publish_year: 1983,
      key: 'abc123',
      title: 'book title 1'
    })).toEqual({
      author: [],
      authorKey: [],
      coverImageId: -1,
      edition: 1,
      firstPublishYear: 1983,
      key: 'abc123',
      title: 'book title 1'
    });
  });

  test('search', async () => {
    const errorLogSpy = vi.spyOn(console, 'error');

    search.mockResolvedValueOnce({
      data: {
        docs: [{
          author_key: ['ak1', 'ak2'],
          author_name : ['an1', 'an2'],
          cover_i: 456,
          edition_count: 123,
          first_publish_year: 1983,
          key: 'abc123',
          title: 'book title 1'
        }],
        num_found: 123,
        start: 0
      }
    })
      .mockRejectedValueOnce({ error: 'NO' });

    setActivePinia(createPinia());

    const store = useLibraryStore();
    const resetSpy = vi.spyOn(store, 'reset');
    const setBooksSpy = vi.spyOn(store, 'setBooks');
    const setOffsetSpy = vi.spyOn(store, 'setOffset');
    const setPagingSpy = vi.spyOn(store, 'setPaging');
    const setQuerySpy = vi.spyOn(store, 'setQuery');
    const setUpdatingSpy = vi.spyOn(store, 'setUpdating');

    // no args
    await searchFunction();
    expect(resetSpy).toBeCalledTimes(1);

    // not enough characters for a search
    await searchFunction('ab');
    expect(resetSpy).toBeCalledTimes(2);

    // expected search
    await searchFunction('abc');
    await searchFunction('abc'); // catch the unchanged args returning without execution
    expect(resetSpy).toBeCalledTimes(2);
    expect(setUpdatingSpy).toHaveBeenCalledTimes(2);
    expect(setQuerySpy).toHaveBeenCalledWith('abc');
    expect(setOffsetSpy).toHaveBeenCalledWith(0);
    expect(setPagingSpy).toBeCalledWith(0, 123);
    expect(setBooksSpy).toHaveBeenCalledWith([{
      author: ['an1', 'an2'],
      authorKey: ['ak1', 'ak2'],
      coverImageId: 456,
      edition: 123,
      firstPublishYear: 1983,
      key: 'abc123',
      title: 'book title 1'
    }]);
    expect(search).toHaveBeenCalledOnce();

    // unchanged response
    await searchFunction('abcd');
    expect(errorLogSpy).toHaveBeenCalledOnce();
    expect(errorLogSpy).toHaveBeenCalledWith('library::index::search -', { error: 'NO' });
  });
});
