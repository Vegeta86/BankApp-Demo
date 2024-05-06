import { CurrencyUSDPipe } from './currency-usd.pipe';

describe('CurrencyUSDPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyUSDPipe();
    expect(pipe).toBeTruthy();
  });
});
