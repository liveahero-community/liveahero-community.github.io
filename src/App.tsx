// Node modules.
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// Local modules.
import { Language } from './models/System';
import * as Routes from './utils/Routes';
// Local components.
import * as Screen from './screens/';

const App: React.FC = () => {
  const useLanguage = useState<Language>('zhTW');

  return (
    <Router>
      <Switch>
        <Route path={Routes.HEROES}>
          <Screen.HeroesScreen useLanguage={useLanguage} />
        </Route>
        <Route path={Routes.STATUSES}>
          <Screen.StatusesScreen useLanguage={useLanguage} />
        </Route>
        <Route path={Routes.HOME}>
          <Redirect to={Routes.HEROES} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
