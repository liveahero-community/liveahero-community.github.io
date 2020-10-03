// Node modules.
import _ from 'lodash';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import { characterDict } from '../../utils/DataProcess';
// Local components.
import * as Character from './index';

interface CatalogProps {
  className?: string;
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { className } = props;

  console.log(characterDict);

  return (
    <Grid className={className} centered doubling>
      {_.map(characterDict, (character, i) => (
        <Grid.Column className='character-profile' key={i}
          mobile={8}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={3}
        >
          <Character.Profile
            character={character as any}
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
