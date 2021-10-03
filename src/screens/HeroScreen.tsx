// Node modules.
import _ from 'lodash';
import React, { useState, useContext, useCallback } from 'react';
import { useParams, Redirect } from 'react-router-dom';
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
import urlJoin from 'url-join';
// Local modules.
import * as Configs from '../configs';
import * as Routes from '../utils/Routes';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as Hero from '../components/Character/index';

const HeroScreen: React.FC = () => {
  const { language, masterData } = useContext(AppContext);

  const { resourceName } = useParams<any>();

  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = useCallback((_event, data: TabProps) => {
    setTabIndex(Number(data.activeIndex));
  }, []);

  const character: DataExtend.CharacterData = _.get(masterData?.characterDict, resourceName);

  if (!character) {
    const found = _.find(masterData?.characterDict, (character) => {
      const characterId = parseInt(resourceName);
      return character.meta.characterId === characterId;
    });

    if (found) {
      return <Redirect to={`${Routes.HEROES}/${found.meta.resourceName}`} />;
    };
  }

  console.log('character', character);

  return (
    <Framework.Common>
      {character && [
        <Helmet key='helmet'>
          <meta charSet='utf-8' />
          <meta property='og:title' content={character.meta.cardName} />
          <meta property='og:site_name' content={Configs.websiteTitle[language]} />
          <meta property='og:description' content={Configs.websiteTitle[language]} />
          <meta property='og:image' content={urlJoin(Configs.publicUrl, `/archives/Texture2D/icon_${character?.meta?.resourceName}_h01.png`)} />
          <title>{`${character.meta.cardName} | ${Configs.websiteTitle[language]}`}</title>
        </Helmet>
        ,
        <Container key='container' id='character-container'>
          <Segment>
            <Header as='h2'>
              {character.meta.resourceName === 'player'
                // Special character - player.
                ? <Image alt='' src={urlJoin(Configs.publicUrl, `/archives/Texture2D/icon_player1_s01.png`)} />
                // Others.
                : tabIndex === 0
                  // Hero tab.
                  ? <Image alt='' src={urlJoin(Configs.publicUrl, `/archives/Texture2D/icon_${character.meta.resourceName}_h01.png`)}
                    onError={(e: any) => { e.target.onerror = null; e.target.src = urlJoin(Configs.publicUrl, `/archives/Texture2D/icon_${character.meta.resourceName}_s01.png`) }}
                  />
                  // Sidekick tab.
                  : <Image alt='' src={urlJoin(Configs.publicUrl, `/archives/Texture2D/icon_${character.meta.resourceName}_s01.png`)}
                    onError={(e: any) => { e.target.onerror = null; e.target.src = urlJoin(Configs.publicUrl, `/archives/Texture2D/icon_${character.meta.resourceName}_h01.png`) }}
                  />
              }
              {`${character.meta.cardName} (${character.meta.resourceName})`}
            </Header>

            <Tab
              menu={{ secondary: true, pointing: true }}
              onTabChange={onTabChange}
              panes={[
                {
                  menuItem: '英雄',
                  render: () => (_.isEmpty(character.heroes)
                    ? <Message>
                      <Message.Header>此人物不能作為英雄</Message.Header>
                    </Message>
                    : <Hero.HeroMetric heroCards={character.heroes} />
                  ),
                },
                {
                  menuItem: '助手',
                  render: () => (_.isEmpty(character.sidekicks)
                    ? <Message>
                      <Message.Header>此人物不能作為助手</Message.Header>
                    </Message>
                    : <Hero.SidekickMetric sidekickCards={character.sidekicks} />
                  ),
                },
                {
                  menuItem: '情報',
                  render: () => <Hero.Metadata character={character} />,
                },
                {
                  menuItem: '玩家討論',
                  render: () => <Hero.PlayerDiscussion character={character} />,
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
