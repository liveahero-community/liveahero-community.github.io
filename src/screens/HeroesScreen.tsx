// Node modules.
import _ from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import { Container } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as Character from '../components/Character';

const MAX_AMOUNT_ELEMENT = 5;

const HeroesScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  const [ranks, setRanks] = useState<boolean[]>(_.times(3, _.stubTrue));
  const [elements, setElements] = useState<boolean[]>(_.times(MAX_AMOUNT_ELEMENT, _.stubTrue));

  const updateRanks = useCallback((index: number) => {
    const newRanks = _.clone(ranks);
    newRanks[index] = !newRanks[index];
    setRanks(newRanks);
  }, [ranks]);

  const updateElements = useCallback((index: number) => {
    const withoutFiltered = !_.includes(elements, false);
    const selectedIndex = _.indexOf(elements, true);

    let newElements: boolean[];
    if (!withoutFiltered && index === selectedIndex) {
      newElements = _.times(MAX_AMOUNT_ELEMENT, _.stubTrue);
    } else {
      newElements = _.times(MAX_AMOUNT_ELEMENT, _.stubFalse);
      newElements[index] = true;
    }

    setElements(newElements);
  }, [elements]);

  const filtering = { ranks, elements };

  return (
    <Framework.Common>
      <Container>
        <Character.Catalog
          language={language}
          filtering={filtering}
        />
      </Container>

      <Character.CatalogFilter
        ranks={ranks}
        updateRanks={updateRanks}
        elements={elements}
        updateElements={updateElements}
      />
    </Framework.Common>
  );
};

export {
  HeroesScreen,
};
