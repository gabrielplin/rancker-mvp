import { ASTERISKS_x11, CRYPTO_TOKEN, CURRENT_DATE, TOKEN_NAME } from './vars';

jest.mock('./vars', () => ({
  CRYPTO_TOKEN: 'mocked-crypto-token',
  TOKEN_NAME: 'rancker.account',
  CURRENT_DATE: new Date(),
  ASTERISKS_x11: '***********'
}));

describe('Config Variables', () => {
  it('should return the correct CRYPTO_TOKEN', () => {
    expect(CRYPTO_TOKEN).toBe('mocked-crypto-token');
  });

  it('should return the correct TOKEN_NAME', () => {
    expect(TOKEN_NAME).toBe('rancker.account');
  });

  it('should return the current date for CURRENT_DATE', () => {
    const today = new Date();
    expect(CURRENT_DATE.toDateString()).toBe(today.toDateString());
  });

  it('should return 11 asterisks for ASTERISKS_x11', () => {
    expect(ASTERISKS_x11).toBe('***********'); // 11 asterisks
  });
});
