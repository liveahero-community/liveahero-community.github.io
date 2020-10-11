// Node modules.
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { CharacterData } from '../../models/Hero';
// Local modules.
import { Language } from '../../models/System';
import { allCharacterDict } from '../../utils/DataProcess';
// Local components.
import * as Character from './index';

interface CatalogProps {
  className?: string;
  language: Language;
  filtering: {
    ranks: boolean[];
    elements: boolean[];
  };
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { className } = props;
  const { language, filtering } = props;

  const { elements } = filtering;

  const [characterDict, setCharacterDict] = useState(allCharacterDict[language]);

  useEffect(() => {
    setCharacterDict(allCharacterDict[language]);
  }, [language]);

  return (
    <Grid className={className} centered doubling>
      {_.map(characterDict, (character: CharacterData, i) => (
        // TODO: refactor in future.
        // Filter for all - include none element.
        (!_.includes(elements, false) && _.isUndefined(character.meta.heroElement))
        // Filter specified element - without none element.
        || (_.isNumber(character.meta.heroElement) && elements[character.meta.heroElement - 1])
          ? <Grid.Column className='character-profile' key={i}
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
          : null
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
