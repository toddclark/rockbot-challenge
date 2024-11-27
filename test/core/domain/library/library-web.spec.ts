import {
  search,
  SEARCH_URL,
} from '@/core/domain/library/library-web.ts';

describe('library-web', () => {
  global.fetch = vi.fn()
    .mockResolvedValueOnce({ json: () => ({ test: 'testval' }) })
    .mockRejectedValueOnce('error message');

  // critical enpoint paths should be checked to ensure their change is verified
  test('ensure base URLs are verified if changed', () => {
    expect(SEARCH_URL).toEqual('/api/library/search');
  });

  test('search', async () => {
    const requestOptions = {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await search({ a: 'aval', b: 'bval'});
    expect(fetch).toHaveBeenCalledWith('/api/library/search?a=aval&b=bval', requestOptions);

    // erroneous mocked above
    await expect(search({ a: 'aval', b: 'bval'})).rejects.toThrowError();
  });
});
