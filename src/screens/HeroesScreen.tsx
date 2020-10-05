// Node modules.
import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as Character from '../components/Character';

const HeroesScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Container>
        <Character.Catalog
          language={language}
        />
      </Container>
    </Framework.Common>
  );
};

export {
  HeroesScreen,
};
