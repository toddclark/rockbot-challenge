import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';

import LibraryListing from '@/components/library/LibraryListing.vue';

const { search } = vi.hoisted(() => ({ search: vi.fn() }));
vi.mock('@/core/domain/library', () => ({ search }));

describe('LibraryListing', () => {
  let pinia: any;

  const createWrapper = () => mount(LibraryListing, {
    global: {
      plugins: [pinia]
    },
  }) as any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.useFakeTimers();
  });

  test('mount', async () => {
    expect(LibraryListing).toBeTruthy();

    search.mockResolvedValue({});

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLElement);

    expect(wrapper.vm.books).toEqual([]);
    expect(wrapper.vm.debounceTimeout).toBeNull();
    expect(wrapper.vm.limit).toEqual(20);
    expect(wrapper.vm.offset).toEqual(0);
    expect(wrapper.vm.query).toEqual('');
    expect(wrapper.vm.total).toEqual(0);
    expect(wrapper.vm.updating).toBeFalsy();

    expect(search).toHaveBeenCalledWith('', 0);

    wrapper.vm.query = 'abcd';
    await wrapper.vm.$nextTick();
    await vi.runAllTimers();

    expect(search).toHaveBeenCalledWith('abcd', 0);
    expect(search).toHaveBeenCalledTimes(2);
  });

  test('paging', async () => {
    search.mockResolvedValue({});

    const wrapper = createWrapper();

    expect(search).toHaveBeenCalledWith('', 0);

    wrapper.vm.query = 'abcd';
    await wrapper.vm.$nextTick();
    await vi.runAllTimers();

    expect(search).toHaveBeenCalledWith('abcd', 0);

    useLibraryStore().setPaging(0, 50, 20);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.total).toEqual(50);
    expect(wrapper.vm.blockNext).toBeFalsy();
    expect(wrapper.vm.blockPrev).toBeTruthy();

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();
    await vi.runAllTimers();

    expect(search).toHaveBeenCalledWith('abcd', 20);

    useLibraryStore().setPaging(40, 50, 20);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.blockNext).toBeTruthy();
    expect(wrapper.vm.blockPrev).toBeFalsy();

    wrapper.vm.prevPage();
    await wrapper.vm.$nextTick();
    await vi.runAllTimers();

    expect(search).toHaveBeenCalledWith('abcd', 20);

    expect(search).toHaveBeenCalledTimes(6);
  });
});
