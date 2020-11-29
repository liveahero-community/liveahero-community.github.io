// Node modules.
import React, { useContext } from 'react';
import {
  Container,
  Header,
  Button,
  Divider,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// Local modules.
import * as Config from '../configs/index';
import * as Routes from '../utils/Routes';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';

const MiscScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`遊戲系統 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`遊戲系統`}</Header>

        <Link to={Routes.EXP}>
          <Button basic inverted>
            {`英雄 / 助手 升級經驗列表`}
          </Button>
        </Link>

        <Divider hidden />

        <Link to={Routes.STATUSES}>
          <Button basic inverted>
            {`增益 / 減益 狀態一覽`}
          </Button>
        </Link>
      </Container>
    </Framework.Common>
  );
}

export {
  MiscScreen,
};
