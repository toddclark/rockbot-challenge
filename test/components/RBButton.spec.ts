import { mount } from '@vue/test-utils';
import RBButton from '@/components/RBButton.vue';

describe('RBButton', () => {
  type Props = InstanceType<typeof RBButton>['$props'];
  const createWrapper = (props?: Props) => mount(RBButton, {
    props
  });

  test('empty mount', () => {
    expect(RBButton).toBeTruthy();

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLButtonElement);
    expect(wrapper.find('.rb-button').exists()).toBeTruthy();

    // check prop defaults
    expect(wrapper.vm.ariaHidden).toBeFalsy();
    expect(wrapper.vm.ariaLabel).toBeUndefined();
    expect(wrapper.vm.ariaLabelledBy).toBeUndefined();
    expect(wrapper.vm.disabled).toBeFalsy();
    expect(wrapper.vm.flippedH).toBeFalsy();
    expect(wrapper.vm.flippedV).toBeFalsy();
    expect(wrapper.vm.icon).toEqual('');
    expect(wrapper.vm.label).toEqual('');
    expect(wrapper.vm.rotated).toBeFalsy();

    // computed
    expect((wrapper.vm as any).consolidatedAriaLabel).toEqual('');
  });

  test('complete props mount', async () => {
    const wrapper = createWrapper({
      ariaHidden: true,
      ariaLabel: 'test-ariaLabel',
      ariaLabelledBy: 'test-ariaLabelledBy',
      disabled: true,
      flippedH: true,
      flippedV: true,
      icon: 'test-icon',
      label: 'test-label',
      rotated: true
    });

    await wrapper.vm.$nextTick();

    // check props
    expect(wrapper.vm.ariaHidden).toBeTruthy();
    expect(wrapper.vm.ariaLabel).toEqual('test-ariaLabel');
    expect(wrapper.vm.ariaLabelledBy).toEqual('test-ariaLabelledBy');
    expect(wrapper.vm.disabled).toBeTruthy();
    expect(wrapper.vm.flippedH).toBeTruthy();
    expect(wrapper.vm.flippedV).toBeTruthy();
    expect(wrapper.vm.icon).toEqual('test-icon');
    expect(wrapper.vm.label).toEqual('test-label');
    expect(wrapper.vm.rotated).toBeTruthy();

    // computed
    expect((wrapper.vm as any).consolidatedAriaLabel).toBeUndefined();
  });

  test('consolidatedAriaLabel handling', async () => {
    let wrapper = createWrapper({
      ariaLabel: 'test-ariaLabel',
      ariaLabelledBy: 'test-ariaLabelledBy',
      label: 'test-label',
    });

    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).consolidatedAriaLabel).toBeUndefined();

    wrapper = createWrapper({
      ariaLabel: 'test-ariaLabel',
      label: 'test-label',
    });

    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).consolidatedAriaLabel).toEqual('test-ariaLabel');

    wrapper = createWrapper({
      label: 'test-label',
    });

    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).consolidatedAriaLabel).toEqual('test-label');
  });
});
