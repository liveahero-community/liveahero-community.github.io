// Node modules.
import React, { useContext } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from '../configs/index';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import { StatusTable } from '../components/Status/StatusTable';

const StatusesScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`狀態一覽 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`狀態一覽`}</Header>

        <StatusTable />
      </Container>
    </Framework.Common>
  );
}

export {
  StatusesScreen,
};
