import { mount } from '@vue/test-utils';

import LibraryListItem from '@/components/library/LibraryListItem.vue';

describe('LibraryListItem', () => {
  type Props = InstanceType<typeof LibraryListItem>['$props'];
  const createWrapper = (props?: Props) => mount(LibraryListItem, {
    props
  });

  test('default mount', async () => {
    expect(LibraryListItem).toBeTruthy();

    const warnSpy = vi.spyOn(console, 'warn');

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLElement);

    expect(wrapper.vm.data).toBeUndefined();

    expect(/Missing\s+required\s+prop:\s+"data"/.test(warnSpy.mock.calls[0] as any)).toBeTruthy();
  });

  test('mount', async () => {
    expect(LibraryListItem).toBeTruthy();

    const warnSpy = vi.spyOn(console, 'warn');

    const mockData = {
      authorKey: ['k1', 'k2'],
      author: ['a1', 'a2'],
      coverImageId: 123,
      edition: 234,
      firstPublishYear: 1983,
      key: 'test-key',
      title: 'test-title',
    };

    const wrapper = createWrapper({ data: mockData });

    expect(wrapper.vm.data).toEqual(mockData);

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
