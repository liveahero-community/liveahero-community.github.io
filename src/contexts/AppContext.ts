// Node modules.
import React from 'react';
// Local modules.
import { DataProcess } from '../utils/DataProcess';

const AppContext = React.createContext({} as {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  masterData?: DataProcess;
});

export {
  AppContext,
};
