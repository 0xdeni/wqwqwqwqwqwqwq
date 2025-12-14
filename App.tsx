import React, { useState, useEffect } from 'react';
import { Tab, CryptoAsset, AppSettings, Currency, Language, Theme } from './types';
import { BottomNav } from './components/BottomNav';
import { WalletView } from './views/WalletView';
import { StatsView } from './views/StatsView';
import { ProfileView } from './views/ProfileView';
import { DepositPixView } from './views/DepositPixView';
import { SwapView } from './views/SwapView';
import { SendView } from './views/SendView';
import { NotificationsView } from './views/NotificationsView';
import { CardView } from './views/CardView';
import { DepositOptionsView } from './views/DepositOptionsView';
import { DepositCryptoView } from './views/DepositCryptoView';
import { SplashScreen } from './views/SplashScreen';
import { WelcomeScreen } from './views/WelcomeScreen';
import { LoginScreen } from './views/LoginScreen';
import { SignupScreen } from './views/SignupScreen';

// Mock Data - Removed LTC and TRX as requested
const MOCK_ASSETS: CryptoAsset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.01912343,
    valueUsd: 42340.23,
    change: 2.34,
    color: 'bg-orange-500',
    history: [40, 45, 30, 50, 45, 60, 55, 65]
  },
  {
    id: '4',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 2.4,
    valueUsd: 2246.95,
    change: 2.93,
    color: 'bg-indigo-500',
    history: [20, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75]
  }
];

type AuthState = 'welcome' | 'login' | 'signup';

const DICTIONARY = {
  en: {
    wallet: 'Wallet',
    deposit: 'Deposit',
    send: 'Send',
    swap: 'Swap',
    connect: 'Connect',
    assets: 'Your Assets',
    stats: 'Statistics',
    card: 'Cards',
    profile: 'Profile',
    welcome: 'Welcome back',
    totalBalance: 'Total Balance',
    today: 'Today',
    // Swap
    payWith: 'Pay with',
    receive: 'Receive',
    balance: 'Balance',
    bestOffer: 'Best offer found',
    enterAmount: 'Enter amount to start',
    previewSwap: 'Preview Swap',
    rate: 'Rate',
    networkFee: 'Network Fee',
    slippage: 'Slippage Tolerance',
    // Stats
    marketCap: 'Market Cap',
    circSupply: 'Circulating Supply',
    volume: 'Volume (24H)',
    buy: 'Buy',
    sell: 'Sell',
    // Profile
    preferences: 'Preferences',
    account: 'Account',
    darkMode: 'Dark Mode',
    currency: 'Currency',
    language: 'Language',
    logout: 'Log Out',
    save: 'Save',
    cancel: 'Cancel',
    // Deposit/Send
    depositFunds: 'Deposit Funds',
    depositBrl: 'Deposit BRL',
    instantTransfer: 'Instant transfer via PIX',
    depositCrypto: 'Deposit Crypto',
    selectAsset: 'Select Asset',
    recipientAddress: 'Recipient Address',
    sendNow: 'Send Now',
    sending: 'Sending...',
    selectNetwork: 'Select Network',
    shareAddress: 'Share Address'
  },
  pt: {
    wallet: 'Carteira',
    deposit: 'Depositar',
    send: 'Enviar',
    swap: 'Trocar',
    connect: 'Conectar',
    assets: 'Seus Ativos',
    stats: 'Estatísticas',
    card: 'Cartões',
    profile: 'Perfil',
    welcome: 'Bem-vindo(a)',
    totalBalance: 'Saldo Total',
    today: 'Hoje',
    // Swap
    payWith: 'Pagar com',
    receive: 'Receber',
    balance: 'Saldo',
    bestOffer: 'Melhor oferta encontrada',
    enterAmount: 'Digite o valor',
    previewSwap: 'Prévia da Troca',
    rate: 'Taxa',
    networkFee: 'Taxa de Rede',
    slippage: 'Tolerância de Slippage',
    // Stats
    marketCap: 'Cap. de Mercado',
    circSupply: 'Suprimento Circ.',
    volume: 'Volume (24H)',
    buy: 'Comprar',
    sell: 'Vender',
    // Profile
    preferences: 'Preferências',
    account: 'Conta',
    darkMode: 'Modo Escuro',
    currency: 'Moeda',
    language: 'Idioma',
    logout: 'Sair',
    save: 'Salvar',
    cancel: 'Cancelar',
    // Deposit/Send
    depositFunds: 'Depositar Fundos',
    depositBrl: 'Depositar BRL',
    instantTransfer: 'Transferência via PIX',
    depositCrypto: 'Depositar Cripto',
    selectAsset: 'Selecionar Ativo',
    recipientAddress: 'Endereço do Destinatário',
    sendNow: 'Enviar Agora',
    sending: 'Enviando...',
    selectNetwork: 'Selecionar Rede',
    shareAddress: 'Compartilhar'
  }
};

function App() {
  // Auth State
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState<AuthState>('welcome');

  // App State
  const [activeTab, setActiveTab] = useState<Tab>(Tab.WALLET);
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  
  // Settings
  const [settings, setSettings] = useState<AppSettings>({
    currency: 'USD',
    language: 'en',
    theme: 'dark'
  });

  // Apply Theme
  useEffect(() => {
    if (settings.theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [settings.theme]);

  const t = DICTIONARY[settings.language];

  // Splash Screen Logic
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Auth Flow Logic
  if (!isAuthenticated) {
    switch (authStep) {
        case 'welcome':
            return <WelcomeScreen onLogin={() => setAuthStep('login')} onSignup={() => setAuthStep('signup')} />;
        case 'login':
            return <LoginScreen onBack={() => setAuthStep('welcome')} onLogin={() => setIsAuthenticated(true)} />;
        case 'signup':
            return <SignupScreen onBack={() => setAuthStep('welcome')} onSignup={() => setIsAuthenticated(true)} />;
    }
  }

  // Main App Logic
  const renderView = () => {
    switch(activeTab) {
        case Tab.WALLET:
            return (
                <WalletView 
                    assets={MOCK_ASSETS} 
                    onAssetClick={(asset) => {
                        setSelectedAsset(asset);
                        setActiveTab(Tab.STATS);
                    }}
                    onDeposit={() => setActiveTab(Tab.DEPOSIT_OPTIONS)}
                    onSend={() => setActiveTab(Tab.SEND)}
                    onNotifications={() => setActiveTab(Tab.NOTIFICATIONS)}
                    currency={settings.currency}
                    t={t}
                />
            );
        case Tab.STATS:
            const assetToShow = selectedAsset || MOCK_ASSETS[0];
            return <StatsView asset={assetToShow} onBack={() => setActiveTab(Tab.WALLET)} t={t} currency={settings.currency} />;
        case Tab.CARD:
            return <CardView />;
        case Tab.SWAP:
            return <SwapView assets={MOCK_ASSETS} t={t} />;
        case Tab.PROFILE:
            return (
                <ProfileView 
                    onNotifications={() => setActiveTab(Tab.NOTIFICATIONS)}
                    settings={settings}
                    onUpdateSettings={setSettings}
                    t={t}
                />
            );
        case Tab.DEPOSIT_OPTIONS:
            return (
                <DepositOptionsView 
                    onBack={() => setActiveTab(Tab.WALLET)}
                    onSelectPix={() => setActiveTab(Tab.DEPOSIT_PIX)}
                    onSelectCrypto={() => setActiveTab(Tab.DEPOSIT_CRYPTO)}
                    t={t}
                />
            );
        case Tab.DEPOSIT_PIX:
            return <DepositPixView onBack={() => setActiveTab(Tab.DEPOSIT_OPTIONS)} />;
        case Tab.DEPOSIT_CRYPTO:
            return <DepositCryptoView assets={MOCK_ASSETS} onBack={() => setActiveTab(Tab.DEPOSIT_OPTIONS)} t={t} />;
        case Tab.SEND:
            return <SendView assets={MOCK_ASSETS} onBack={() => setActiveTab(Tab.WALLET)} t={t} currency={settings.currency} />;
        case Tab.NOTIFICATIONS:
            return <NotificationsView onBack={() => setActiveTab(Tab.WALLET)} />;
        default:
            return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      {renderView()}
      <BottomNav 
        currentTab={activeTab} 
        setTab={setActiveTab} 
        isDark={activeTab === Tab.STATS || (activeTab === Tab.CARD && settings.theme === 'dark')} 
      />
    </div>
  );
}

export default App;