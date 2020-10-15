// Node modules.
import React from 'react';
// Local modules.
import { Language } from '../models/System';
import { DataProcess } from '../utils/DataProcess';

const AppContext = React.createContext({} as {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  masterData?: DataProcess;
});

export {
  AppContext,
};
