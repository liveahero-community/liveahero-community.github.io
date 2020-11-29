// Node modules.
import React, { useState, useContext, useCallback, useEffect } from 'react';
import {
  Grid,
  Segment,
  Image,
  Flag,
  Button,
  Container,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
// Local modules.
import * as Config from '../../configs/index';
import * as Routes from '../../utils/Routes';
import { AppContext } from '../../contexts/AppContext';
// Local components.
import { ScrollToTop } from '../../components/Common/';

interface AppProps {
  className?: string;
}

const Common: React.FC<AppProps> = (props) => {
  const { className, children } = props;

  const { setLanguage, masterData } = useContext(AppContext);

  const [logoUrl] = useState('/assets/logo.png');
  const [version, setVersion] = useState(masterData?.version);

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    toast(`現在語系為 ${Config.displayedLanguage[lang]}`);
  }, [setLanguage]);

  useEffect(() => {
    setVersion(masterData?.version);
  }, [masterData]);

  return (
    <div className={className}>
      <ScrollToTop />

      <Segment className='logo-banner' basic attached textAlign='center'>
        <Link to={Routes.HOME}>
          <Image size='medium' centered src={logoUrl} />
          <div className='subtitle'>{'UNOFFICIAL DATABASE'}</div>
        </Link>

        <Container text>
          <Grid className='links' centered textAlign='center' columns={4}>
            <Grid.Column textAlign='center'>
              <Link to={Routes.HEROES}>
                <Button basic inverted icon={isMobile}>
                  <Icon name='street view' />
                  {!isMobile && <span>{`英雄資料`}</span>}
                </Button>
              </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Link to={Routes.SKILL_CATEGORIES}>
                <Button basic inverted icon={isMobile}>
                  <Icon name='book' />
                  {!isMobile && <span>{`技能列表`}</span>}
                </Button>
              </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Link to={Routes.MISC}>
                <Button basic inverted icon={isMobile}>
                  <Icon name='gamepad' />
                  {!isMobile && <span>{`遊戲系統`}</span>}
                </Button>
              </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Link to={Routes.COMMUNITIES}>
                <Button basic inverted icon={isMobile}>
                  <Icon name='users' />
                  {!isMobile && <span>{`社群資源`}</span>}
                </Button>
              </Link>
            </Grid.Column>
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

        <div className='footer'>
          <Link className='source' to={Routes.CONTRIBUTORS}>
            {'Made by liveahero-community'}

            <p className={'version'}>
              {`ver. ${version?.appVersion} (${version?.masterVersion})`}
            </p>
          </Link>
        </div>
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
        color: inherit;
        text-decoration: none;
      }

      .version {
        font-size: 0.75em;
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
