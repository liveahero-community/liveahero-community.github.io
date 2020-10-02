// Node modules.
import _ from 'lodash';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
// Local modules.
import { characterDict } from '../../utils/DataProcess';
// Local components.
import * as Character from './index';

const Catalog: React.FC = () => {
  const rows = isMobile ? 2 : 5;

  // console.log(characterDict);

  return (
    <Card.Group itemsPerRow={rows}>
      {_.map(characterDict, (character, i) => (
        <Character.Profile key={i}
          character={character as any}
        />
      ))}
    </Card.Group>
  );
}

export {
  Catalog,
};
