import { Language } from '../models/System';

type i18nContent = {
  [language in Language]: string;
}

export const publicUrl: string = 'https://liveahero-community.github.io/';

export const websiteTitle: i18nContent = {
  zhTW: 'LIVE A HERO - 非官方資料站',
  jaJP: 'LIVE A HERO - 非公式の攻略情報',
  enUS: 'LIVE A HERO - unofficial database',
};

export const websiteDescription: i18nContent = {
  zhTW: 'LIVE A HERO / 全英雄、助手的能力、技能資料彙整。',
  jaJP: 'LIVE A HERO / すべてのヒーローとアシスタントの能力とスキルをまとめたものです。',
  enUS: 'LIVE A HERO / All heroes, sidekicks data about abilities and skills.',
};

export const displayedLanguage: i18nContent = {
  zhTW: '繁體中文',
  jaJP: '日本語',
  enUS: 'English',
};

export const gaTrackingId = 'UA-179486566-1';
