/* eslint-disable react-hooks/exhaustive-deps */
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
import { unpack } from 'jsonpack';
// Local modules.
import * as Config from './configs/index';
import * as Routes from './utils/Routes';
import { DataProcess } from './utils/DataProcess';
import { FigureProvider } from './utils/FigureProvider';
import { AppContext } from './contexts/AppContext';
// Local components.
import { withTracker } from './hoc/ga';
import * as Screen from './screens/';

const App: React.FC = () => {
  const [translationUrl] = useState('https://liveahero-community.github.io/translations');
  const [language, setLanguage] = useState<Language>('zh-TW');
  const [masterData, setMasterData] = useState<DataProcess>();
  const [figureProvider, setFigureProvider] = useState<FigureProvider>();

  const download = useCallback(async (url: string, isJson = true) => {
    const res = await fetch(url);
    const data = isJson ? await res.json() : await res.text();
    return data;
  }, []);

  const fetchMasterData = useCallback(async (language: Language) => {
    const version = await download(`${translationUrl}/version.json`);
    const packedData = await download(`${translationUrl}/latest/${language}/bundles.compressed.json`, false);
    const unpackedData = unpack<any>(packedData);
    const masterDataRaw = {
      heroDataRaw: unpackedData['CardMaster.json'],
      sidekickDataRaw: unpackedData['SidekickMaster.json'],
      heroExpRaw: unpackedData['HeroCardExpMaster.json'],
      sidekickExpRaw: unpackedData['SidekickCardExpMaster.json'],
      skillDataRaw: unpackedData['SkillMaster.json'],
      skillEffectDataRaw: unpackedData['SkillEffectMaster.json'],
      statusDataRaw: unpackedData['StatusMaster.json'],
      userRankRaw: unpackedData['UserRankMaster.json'],
      detailRaw: await download(`${translationUrl}/latest/${language}/Japanese.properties`, false),
    };

    const updatedMasterData = new DataProcess(masterDataRaw, version);

    setMasterData(updatedMasterData);
  }, [translationUrl, download]);

  const fetchIllurationCatalog = useCallback(async () => {
    setFigureProvider(await FigureProvider.build());
  }, []);

  useEffect(() => {
    fetchMasterData(language);
  }, [language, fetchMasterData]);

  useEffect(() => {
    fetchIllurationCatalog();
  }, []);

  return (
    <AppContext.Provider value={{ language, setLanguage, masterData, figureProvider }}>
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
          <Route path={Routes.MISC}
            component={withTracker(Screen.MiscScreen)}
          />
          <Route path={Routes.EXP}
            component={withTracker(Screen.ExpScreen)}
          />
          <Route path={Routes.STATUSES}
            component={withTracker(Screen.StatusesScreen)}
          />
          <Route path={Routes.COMMUNITIES}
            component={withTracker(Screen.CommunitiesScreen)}
          />
          <Route path={Routes.CONTRIBUTORS}
            component={withTracker(Screen.ContributorsScreen)}
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
