import { mount } from '@vue/test-utils';
import RBLoader from '@/components/RBLoader.vue';

describe('RBLoader', () => {
  type Props = InstanceType<typeof RBLoader>['$props'];
  const createWrapper = (props?: Props) => mount(RBLoader, {
    props
  });

  test('default mount', async () => {
    expect(RBLoader).toBeTruthy();

    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();

    // check for basic instantiation
    expect(wrapper.vm.$el.tagName).toEqual('DIV');
    expect(wrapper.vm.$el.classList).toContain('loader');

    // check prop defaults
    expect(wrapper.vm.large).toBeFalsy();
  });

  test('complete props mount', async () => {
    const wrapper = createWrapper({
      large: true
    });

    await wrapper.vm.$nextTick();

    // check props
    expect(wrapper.vm.large).toBeTruthy();
  });
});
