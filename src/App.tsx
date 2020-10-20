// Node modules.
import React, { useState, useEffect, useCallback } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import fetch from 'node-fetch';
// Local modules.
import * as Config from './configs/index';
import { Language } from './models/System';
import * as Routes from './utils/Routes';
import { DataProcess } from './utils/DataProcess';
import { AppContext } from './contexts/AppContext';
// Local components.
import { withTracker } from './hoc/ga';
import * as Screen from './screens/';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zh-TW');
  // Data preparing.
  const [masterData, setMasterData] = useState<DataProcess>();

  const download = useCallback(async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }, []);

  const fetchMasterData = useCallback(async (language: Language) => {
    const masterRawData = await Promise.all([
      download(`https://liveahero-community.github.io/translations/latest/${language}/CardMaster.json`),
      download(`https://liveahero-community.github.io/translations/latest/${language}/SidekickMaster.json`),
      download(`https://liveahero-community.github.io/translations/latest/${language}/SkillMaster.json`),
      download(`https://liveahero-community.github.io/translations/latest/${language}/SkillEffectMaster.json`),
      download(`https://liveahero-community.github.io/translations/latest/${language}/StatusMaster.json`),
    ]).then(([heroDataRaw, sidekickDataRaw, skillDataRaw, skillEffectDataRaw, statusDataRaw]) => ({
      heroDataRaw, sidekickDataRaw, skillDataRaw, skillEffectDataRaw, statusDataRaw,
    }));

    const updatedMasterData = new DataProcess(masterRawData);

    setMasterData(updatedMasterData);
  }, [download]);

  useEffect(() => {
    fetchMasterData(language);
  }, [language, fetchMasterData]);

  return (
    <AppContext.Provider value={{ language, setLanguage, masterData }}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{Config.websiteTitle[language]}</title>
        <link rel='canonical' href={Config.publicUrl} />
        <meta name='description' content={Config.websiteDescription[language]} />
      </Helmet>

      <HashRouter>
        <Switch>
          <Route path={Routes.HERO}
            component={withTracker(Screen.HeroScreen)}
          />
          <Route path={Routes.HEROES}
            component={withTracker(Screen.HeroesScreen)}
          />
          <Route path={Routes.SKILL_CATEGORY}
            component={withTracker(Screen.SkillCategoryScreen)}
          />
          <Route path={Routes.SKILL_CATEGORIES}
            component={withTracker(Screen.SkillCategoriesScreen)}
          />
          <Route path={Routes.STATUSES}
            component={withTracker(Screen.StatusesScreen)}
          />
          <Route path={Routes.COMMUNITIES}
            component={withTracker(Screen.CommunitiesScreen)}
          />
          <Route path={Routes.HOME}>
            <Redirect to={Routes.HEROES} />
          </Route>
        </Switch>
      </HashRouter>
    </AppContext.Provider>
  );
}

export default App;
