// import { config } from '@vue/test-utils';

// for happy-dom
Object.defineProperty(window.URL, 'createObjectURL', { value: vi.fn() });
Object.defineProperty(window.URL, 'revokeObjectURL', { value: vi.fn() });

//// plugins ////
//config.global.plugins = [];

//// mocks ////
// config.global.mocks = {};

//// fills ////
Element.prototype.scrollIntoView = vi.fn();
