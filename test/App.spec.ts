import { appReadySymbol } from '@/core/injection-keys.ts';
import { mount } from '@vue/test-utils';

import App from '@/App.vue';

describe('App', () => {
  type Props = InstanceType<typeof App>['$props'];

  const readyValue = ref(false);

  const createWrapper = (props?: Props) => mount(App, {
    props,
    global: {
      provide: {
        [appReadySymbol]: readyValue,
      },
      stubs: {
        GlobalNavigation: {
          template: '<div />'
        },
        RBLoadCover: {
          template: '<div />'
        },
        RouterView: {
          template: '<div />'
        },
      },
    },
  });

  beforeEach(async () => {
    readyValue.value = false;
  });

  test('default mount', async () => {
    expect(App).toBeTruthy();

    const wrapper = createWrapper();

    await wrapper.vm.$nextTick();

    readyValue.value = true;
  });
});
