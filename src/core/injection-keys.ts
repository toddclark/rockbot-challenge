import type { InjectionKey } from 'vue';

export const appInitializedSymbol: InjectionKey<boolean> = Symbol.for('app-initialized');
export const appReadySymbol: InjectionKey<boolean> = Symbol.for('app-ready');
