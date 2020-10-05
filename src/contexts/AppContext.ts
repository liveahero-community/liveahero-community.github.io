// Node modules.
import React from 'react';
// Local modules.
import { Language } from '../models/System';

const AppContext = React.createContext({} as {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
});

export {
  AppContext,
};
