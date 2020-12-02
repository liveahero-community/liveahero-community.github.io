type i18nContent = {
  [language in Language]: string;
}

export const publicUrl: string = 'https://liveahero-community.github.io/';

export const websiteTitle: i18nContent = {
  'zh-TW': 'LIVE A HERO - 非官方資料站',
  'zh-CN': 'LIVE A HERO - 非官方资料站',
  'ja-JP': 'LIVE A HERO - 非公式の攻略情報',
  'en-US': 'LIVE A HERO - unofficial database',
};

export const websiteDescription: i18nContent = {
  'zh-TW': 'LIVE A HERO / 全英雄、助手的能力、技能資料彙整。',
  'zh-CN': 'LIVE A HERO / 全英雄、助手的能力、技能资料汇整。',
  'ja-JP': 'LIVE A HERO / すべてのヒーローとアシスタントの能力とスキルをまとめたものです。',
  'en-US': 'LIVE A HERO / All heroes, sidekicks data about abilities and skills.',
};

export const displayedLanguage: i18nContent = {
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  'ja-JP': '日本語',
  'en-US': 'English',
};

export const gaTrackingId = 'UA-179486566-1';
