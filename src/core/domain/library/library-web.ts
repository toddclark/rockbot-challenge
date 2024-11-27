import type {
  LibraryResponseData,
} from './library-types';

export const SEARCH_URL = '/api/library/search';

export const search = async (params: Record<string, any>): Promise<{
  data: LibraryResponseData | null, response: any
}> => {
  const urlParams = new URLSearchParams();
  for (const k in params) {
    urlParams.set(k, params?.[k]);
  }

  try {
    const response = await fetch(`${SEARCH_URL}?${urlParams}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return { data, response};

  } catch(ex: unknown) {
    console.error('library-web::search - ', ex);
    throw ex;
  }
};
