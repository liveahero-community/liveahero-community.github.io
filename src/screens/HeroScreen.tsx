// Node modules.
import _ from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Tab, Message, Segment } from 'semantic-ui-react';
// Local modules.
import { allCharacterDict } from '../utils/DataProcess';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as Hero from '../components/Character/index';

const HeroScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  const { characterId } = useParams();

  const [characterDict, setCharacterDict] = useState(allCharacterDict[language]);

  useEffect(() => {
    setCharacterDict(allCharacterDict[language]);
  }, [language]);

  const character = characterDict[characterId];

  console.log(character);

  return (
    <Framework.Common>
      <Container id='character-container'>
        <Segment>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={[
              {
                menuItem: '英雄資訊',
                render: () => (_.isEmpty(character.heroes)
                  ? <Message>
                    <Message.Header>此人物不能作為英雄</Message.Header>
                  </Message>
                  : <Hero.HeroMetric heroCards={character.heroes} />
                ),
              },
              {
                menuItem: '助手資訊',
                render: () => (_.isEmpty(character.sidekicks)
                  ? <Message>
                    <Message.Header>此人物不能作為助手</Message.Header>
                  </Message>
                  : <Hero.SidekickMetric sidekickCards={character.sidekicks} />
                ),
              },
              {
                menuItem: '人物資訊',
                render: () => <Hero.Metadata character={character} />,
              },
            ]}
          />
        </Segment>
      </Container>
    </Framework.Common>
  );
};

export {
  HeroScreen,
};
