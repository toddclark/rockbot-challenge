import {
  appInitializedSymbol,
  appReadySymbol,
} from '@/core/injection-keys.ts';

describe('injection keys', () => {
  test('keys...', () =>{
    expect(typeof appInitializedSymbol).toEqual('symbol');
    expect(typeof appReadySymbol).toEqual('symbol');
  });
});
