// Node modules.
import React, { useContext } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from '../configs/index';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import { ExpTable } from '../components/Player';

const PlayerRanksScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`玩家等級一覽 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted floated='left'>
          <Header.Content>
            {`玩家等級一覽`}
          </Header.Content>
        </Header>

        <ExpTable />
      </Container>
    </Framework.Common>
  );
}

export {
  PlayerRanksScreen,
};
