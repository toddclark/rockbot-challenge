import { appInitializedSymbol } from '@/core/injection-keys.ts';
import { mount } from '@vue/test-utils';
import Library from '@/views/Library.vue';

describe('Library', () => {
  type Props = InstanceType<typeof Library>['$props'];

  const initializedValue = ref(false);

  const createWrapper = (props?: Props) => mount(Library, {
    props,
    global: {
      provide: {
        [appInitializedSymbol]: initializedValue,
      },
      stubs: {
        LibraryListing: {
          template: '<div />'
        }
      }
    }
  });

  beforeEach(async () => {
    initializedValue.value = false;
  });

  test('default mount', async () => {
    expect(Library).toBeTruthy();

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLElement);
    expect(wrapper.vm.$el.tagName).toEqual('MAIN');
    expect(wrapper.vm.$el.classList).toEqual({});

    initializedValue.value = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.classList).toContain('initialized');
  });
});
