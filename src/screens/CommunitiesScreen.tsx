// Node modules.
import React, { useContext } from 'react';
import {
  Container,
  List,
  Image,
  Divider,
  Header,
  Segment,
  Grid,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
// Local modules.
import * as Config from '../configs/index';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';

const resources = [
  {
    name: 'LAH 日本官方網站',
    url: 'https://live-a-hero.jp/',
    favicon: 'https://lh3.googleusercontent.com/YZEhLL5msAiwxTodx59BrKyMal6NV7vcRckMLMj6YcS3qh0vuj1W8UIbKUCgbFvesQ=s360',
  },
  {
    name: 'LAH 日本官方 Twitter',
    url: 'https://twitter.com/lah_lw',
    favicon: 'https://abs.twimg.com/favicons/twitter.ico',
  },
  {
    name: 'LAH ENG Wiki (英文 Wiki)',
    url: 'https://liveahero-wiki.github.io/',
    favicon: 'https://liveahero-wiki.github.io/assets/img/favicon.ico',
  },
  {
    name: 'LAH JAP Wiki (日文 Wiki)',
    url: 'https://wikiwiki.jp/live-a-hero/',
    favicon: 'https://cdn.wikiwiki.jp/to/w/common/user-favicon.ico?v=2&v=4',
  },
];

const CommunitiesScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`社群資源 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`社群資源`}</Header>

        <List divided inverted relaxed verticalAlign='middle'>
          {resources.map((resource, i) => (
            <List.Item key={i}>
              <Image avatar src={resource.favicon} />
              <List.Content>
                <a href={resource.url} target='_blank' rel='noopener noreferrer'>
                  <List.Header>{resource.name}</List.Header>
                </a>
              </List.Content>
            </List.Item>
          ))}
        </List>

        <Divider inverted section />

        <Grid stackable columns={2}>
          <Grid.Column>
            <Header inverted>{`LAH 日本官方 Twitter`}</Header>

            <TwitterTimelineEmbed
              sourceType='profile'
              screenName='lah_lw'
              options={{ height: 400 }}
              theme='light'
              noHeader
              noFooter
              noScrollbar
              noBorders
            />
          </Grid.Column>

          <Grid.Column>
            <Header inverted>{`LAH 日本官方情報`}</Header>

            <Segment>
              <iframe style={{ border: 'none' }}
                title='LAH_OFFICIAL_NEWS'
                width='100%'
                height='360'
                src='https://live-a-hero.jp/news?is_webview=1'
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </Framework.Common>
  );
}

export {
  CommunitiesScreen,
};
