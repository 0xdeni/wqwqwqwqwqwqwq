export enum Tab {
  WALLET = 'wallet',
  STATS = 'stats',
  CARD = 'card',
  SWAP = 'swap',
  PROFILE = 'profile',
  DEPOSIT_OPTIONS = 'deposit_options',
  DEPOSIT_PIX = 'deposit_pix',
  DEPOSIT_CRYPTO = 'deposit_crypto',
  SEND = 'send',
  NOTIFICATIONS = 'notifications'
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  valueUsd: number;
  change: number;
  color: string;
  history: number[];
}

export enum TimeFrame {
  H24 = '24H',
  W1 = '1W',
  M1 = '1M',
  Y1 = '1Y'
}

export type Currency = 'USD' | 'BRL';
export type Language = 'en' | 'pt';
export type Theme = 'dark' | 'light';

export interface AppSettings {
  currency: Currency;
  language: Language;
  theme: Theme;
}