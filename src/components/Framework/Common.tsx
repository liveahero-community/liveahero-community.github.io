// Node modules.
import React, { useState, useContext, useCallback } from 'react';
import { Grid, Segment, Image, Flag, Popup, Button, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// Local modules.
import * as Config from '../../configs/index';
import * as Routes from '../../utils/Routes';
import { AppContext } from '../../contexts/AppContext';
import { Language } from '../../models/System';

interface AppProps {
  className?: string;
}

const Common: React.FC<AppProps> = (props) => {
  const { className, children } = props;

  const { setLanguage } = useContext(AppContext);

  const [logoUrl] = useState('/assets/logo.png');

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    toast(`現在語系為 ${Config.displayedLanguage[lang]}`);
  }, [setLanguage]);

  return (
    <div className={className}>
      <Segment className='logo-banner' basic attached textAlign='center'>
        <Link to={Routes.HOME}>
          <Image size='medium' centered src={logoUrl} />
          <div className='subtitle'>{'UNOFFICIAL DATABASE'}</div>
        </Link>

        <Container text>
          <Grid className='links' centered textAlign='center' columns={2}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Link to={Routes.HEROES}>
                  <Button basic inverted>
                    {'英雄資料'}
                  </Button>
                </Link>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Link to={Routes.STATUSES}>
                  <Button basic inverted>
                    {'狀態一覽'}
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <div className='languages'>
          <Flag className='flag'
            name='jp'
            onClick={switchLanguage.bind(null, 'ja-JP')}
          />
          <Flag className='flag'
            name='tw'
            onClick={switchLanguage.bind(null, 'zh-TW')}
          />
        </div>
      </Segment>

      <div className='main-container'>
        {children}
      </div>

      <Segment className='logo-banner' basic attached textAlign='center'>
        <Image size='small' centered src={logoUrl} />

        <Popup inverted position='top center'
          trigger={
            <div className='footer'>
              <a href={`https://forum.gamer.com.tw/Co.php?bsn=39312&sn=106`}>
                {'Made by liveahero-community'}
              </a>
            </div>
          }
          content='程式：Salmon / 翻譯：划水德小牛'
        />
      </Segment>
    </div>
  );
}

const styledCommon = styled(Common)`
  & {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .logo-banner {
    background-color: #EC833D !important;
    border: none !important;

    .subtitle {
      margin-top: 0.25em;
      color: #FFF;
      font-weight: 700;
    }

    .languages {
      position: absolute;
      top: 0;
      right: 0;

      .flag {
        cursor: pointer;
      }
    }

    .links {
      margin-top: 0.25em;
    }

    .footer {
      color: #333;

      a {
        color:inherit;
        text-decoration: none;
      }
    }
  }

  .main-container {
    flex: 1;
    background-color: #333333;
    padding: 3em 0;
  }
`;

export {
  styledCommon as Common,
};
