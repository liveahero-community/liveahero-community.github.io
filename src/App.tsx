// Node modules.
import React, { useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// Local modules.
import * as Routes from './utils/Routes';
import { AppContext } from './contexts/AppContext';
// Local components.
import * as Screen from './screens/';
import { Language } from './models/System';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zhTW');

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
      <HashRouter>
        <Switch>
          <Route path={Routes.HERO}>
            <Screen.HeroScreen />
          </Route>
          <Route path={Routes.HEROES}>
            <Screen.HeroesScreen />
          </Route>
          <Route path={Routes.STATUSES}>
            <Screen.StatusesScreen />
          </Route>
          <Route path={Routes.HOME}>
            <Redirect to={Routes.HEROES} />
          </Route>
        </Switch>
      </HashRouter>
    </AppContext.Provider>
  );
}

export default App;
