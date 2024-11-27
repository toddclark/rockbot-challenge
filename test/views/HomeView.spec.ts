import { appInitializedSymbol } from '@/core/injection-keys.ts';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';

describe('HomeView', () => {
  type Props = InstanceType<typeof HomeView>['$props'];

  const initializedValue = ref(false);

  const createWrapper = (props?: Props) => mount(HomeView, {
    props,
    global: {
      provide: {
        [appInitializedSymbol]: initializedValue,
      }
    }
  });

  beforeEach(async () => {
    initializedValue.value = false;
  });

  test('default mount', async () => {
    expect(HomeView).toBeTruthy();

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLElement);
    expect(wrapper.vm.$el.tagName).toEqual('MAIN');
    expect(wrapper.vm.$el.classList).toEqual({ 0: 'home-view' });

    initializedValue.value = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.classList).toContain('initialized');
  });
});
