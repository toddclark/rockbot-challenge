import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import type { Router } from 'vue-router';
import { createMemoryHistory, createRouter } from 'vue-router';

import { appInitializedSymbol } from '@/core/injection-keys.ts';

import { routes } from '@/router';

describe('top level routes', () => {
  let router: Router;

  const createWrapper = () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    return mount(
      { template: '<div><router-view></router-view></div>' },
      {
        global: {
          plugins: [ router ],
          provide: {
            [appInitializedSymbol as any]: (str: string) => str,
          }
        }
      }
    );
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('route - home - /', async () => {
    const wrapper = createWrapper();

    await router.push('/');

    expect(router.currentRoute.value.path).toEqual('/');
    expect(wrapper.findComponent('.home-view')).toBeTruthy();
  });

  test('route - library - /library', async () => {
    const wrapper = createWrapper();

    await router.push('/library');

    expect(router.currentRoute.value.path).toEqual('/library');
    expect(wrapper.findComponent('.library-view')).toBeTruthy();
  });
});
