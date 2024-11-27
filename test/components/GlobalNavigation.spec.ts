import { mount } from '@vue/test-utils';

import GlobalNavigation from '@/components/GlobalNavigation.vue';

describe('GlobalNavigation', () => {
  type Props = InstanceType<typeof GlobalNavigation>['$props'];
  const createWrapper = (props?: Props) => mount(GlobalNavigation, {
    props
  });

  test('default mount', async () => {
    expect(GlobalNavigation).toBeTruthy();

    const wrapper = createWrapper();

    // check for basic instantiation
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLElement);
    expect(wrapper.vm.open).toBeFalsy();
  });

  test('open mount', async () => {
    const wrapper = createWrapper({ open: true });
    expect(wrapper.vm.open).toBeTruthy();

    const navigateSpy = vi.spyOn(wrapper.vm as any, 'navigate');

    await wrapper.find('.home').trigger('click');
    expect(navigateSpy).toHaveBeenCalledWith('home');
    expect(wrapper.vm.open).toBeFalsy();

    await wrapper.find('.rb-button').trigger('click');
    expect(wrapper.vm.open).toBeTruthy();

    await wrapper.find('.library').trigger('click');
    expect(navigateSpy).toHaveBeenCalledWith('library');
    expect(wrapper.vm.open).toBeFalsy();

    expect(navigateSpy).toHaveBeenCalledTimes(2);

    await wrapper.find('.rb-button').trigger('click');
    expect(wrapper.vm.open).toBeTruthy();

    await wrapper.find('.rb-button').trigger('click');
    expect(wrapper.vm.open).toBeFalsy();
  });
});
