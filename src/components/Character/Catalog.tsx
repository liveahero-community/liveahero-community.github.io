// Node modules.
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { CharacterData } from '../../models/Hero';
// Local modules.
import { allCharacterDict } from '../../utils/DataProcess';
// Local components.
import * as Character from './index';

interface CatalogProps {
  className?: string;
  language: 'jaJP' | 'zhTW';
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { className, language } = props;

  const [characterDict, setCharacterDict] = useState(allCharacterDict[language]);

  useEffect(() => {
    setCharacterDict(allCharacterDict[language]);
  }, [language]);

  console.log(language, characterDict);

  return (
    <Grid className={className} centered doubling>
      {_.map(characterDict, (character: CharacterData, i) => (
        <Grid.Column className='character-profile' key={i}
          mobile={8}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={3}
        >
          <Character.Profile
            character={character}
          />
        </Grid.Column>
      ))}
    </Grid>
  );
}

const styledCatalog = styled(Catalog)`
  .character-profile {
    display: flex !important;
    justify-content: center !important;
    text-align: center !important;
  }
`;

export {
  styledCatalog as Catalog,
};
