// --------------------------------------------------------------------
// TOKENS
// --------------------------------------------------------------------
export const CRYPTO_TOKEN = process.env.NEXT_PUBLIC_CRYPTO_TOKEN || '';

// --------------------------------------------------------------------
// COOKIES
// --------------------------------------------------------------------
export const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || '@';

export const CURRENT_DATE = new Date();

export const ASTERISKS_x11 = ''.padEnd(11, '*');

// --------------------------------------------------------------------
// ZIPCODE APIs
// --------------------------------------------------------------------
export const BRASIL_API_URL = process.env.NEXT_PUBLIC_BRASIL_API_URL || '';
export const VIA_CEP_URL = process.env.NEXT_PUBLIC_VIA_CEP_URL || '';
