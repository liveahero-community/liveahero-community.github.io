// Node modules.
import _ from 'lodash';
import React, { useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Tab,
  TabProps,
  Message,
  Segment,
  Header,
  Image,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from '../configs/index';
import { CharacterData } from '../models/Hero';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as Hero from '../components/Character/index';

const HeroScreen: React.FC = () => {
  const { language, masterData } = useContext(AppContext);

  const { characterId } = useParams<any>();

  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = useCallback((_event, data: TabProps) => {
    setTabIndex(Number(data.activeIndex));
  }, []);

  const character: CharacterData = _.get(masterData?.characterDict, characterId);

  console.log(character);

  return (
    <Framework.Common>
      {character && [
        <Helmet>
          <meta charSet='utf-8' />
          <title>{`${character.meta.cardName} | ${Config.websiteTitle[language]}`}</title>
        </Helmet>
        ,
        <Container id='character-container'>
          <Segment>
            <Header as='h2'>
              {tabIndex === 0
                ? <Image alt='' src={`/assets/icon/item/item_piece_${character.meta.resourceName}.png`} />
                : <Image alt='' src={`/assets/icon/item/item_heart_${character.meta.resourceName}.png`} />
              }
              {`${character.meta.cardName} (${character.meta.resourceName})`}
            </Header>

            <Tab
              menu={{ secondary: true, pointing: true }}
              onTabChange={onTabChange}
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
      ]}
    </Framework.Common>
  );
};

export {
  HeroScreen,
};
