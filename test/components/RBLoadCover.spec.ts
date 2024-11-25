import { appInitializedSymbol, appReadySymbol } from '@/core/injection-keys.ts';
import { flushPromises, mount } from '@vue/test-utils';
import RBLoadCover from '@/components/RBLoadCover.vue';

describe('RBLoadCover', () => {
  type Props = InstanceType<typeof RBLoadCover>['$props'];

  const initializedValue = ref(false);
  const readyValue = ref(false);

  const createWrapper = (props?: Props) => mount(RBLoadCover, {
    props,
    global: {
      provide: {
        [appInitializedSymbol]: initializedValue,
        [appReadySymbol]: readyValue,
      }
    }
  });

  beforeEach(async () => {
    vi.useFakeTimers();
    initializedValue.value = false;
    readyValue.value = false;
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  test('default mount', async () => {
    expect(RBLoadCover).toBeTruthy();

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLElement);
    expect(wrapper.vm.$el.classList).toContain('load-cover');
    expect(wrapper.vm.$el.classList).not.toContain('hero');
    expect(wrapper.vm.$el.querySelector('.loader')).toBeFalsy();

    readyValue.value = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.classList).toContain('hero');
    expect(wrapper.vm.$el.querySelector('.loader')).toBeTruthy();

    expect(initializedValue.value).toBeFalsy();
    vi.runAllTimers();
    await flushPromises();
    expect(initializedValue.value).toBeTruthy();
  });
});
