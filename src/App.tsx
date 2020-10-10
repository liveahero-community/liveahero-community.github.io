// Node modules.
import React, { useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from './configs/index';
import { Language } from './models/System';
import * as Routes from './utils/Routes';
import { AppContext } from './contexts/AppContext';
// Local components.
import { withTracker } from './hoc/ga';
import * as Screen from './screens/';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zhTW');

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
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
          <Route path={Routes.STATUSES}
            component={withTracker(Screen.StatusesScreen)}
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
