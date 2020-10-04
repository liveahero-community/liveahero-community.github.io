// Node modules.
import React from 'react';
import { Container } from 'semantic-ui-react';
// Local modules.
import { Language } from '../models/System';
// Local components.
import * as Framework from '../components/Framework';
import * as Character from '../components/Character';

interface HeroesScreenProps {
  useLanguage: [Language, React.Dispatch<React.SetStateAction<Language>>];
}

const HeroesScreen: React.FC<HeroesScreenProps> = (props) => {
  const { useLanguage } = props;

  const [language] = useLanguage;

  return (
    <Framework.Common useLanguage={useLanguage} >
      <Container>
        <Character.Catalog
          language={language}
        />
      </Container>
    </Framework.Common>
  );
}

export {
  HeroesScreen,
};
