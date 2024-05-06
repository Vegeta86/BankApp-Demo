import { CurrencyFormatPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
