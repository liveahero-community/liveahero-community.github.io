// Node modules.
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Segment, Image, Flag } from 'semantic-ui-react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
// Local modules.
import { Language } from './models/System';
import * as Character from './components/Character';

interface AppProps {
  className?: string;
}

const App: React.FC<AppProps> = (props) => {
  const { className } = props;

  const [logoUrl] = useState('/assets/logo.png');
  const [language, setLanguage] = useState<Language>('zhTW');

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  useEffect(() => {
    toast(`現在語系為 ${language}`);
  }, [language]);

  return (
    <div className={className}>
      <Segment className='logo-banner' basic attached textAlign='center'>
        <Image size='medium' centered src={logoUrl} />

        <div className='languages'>
          <Flag className='flag'
            name='jp'
            onClick={switchLanguage.bind(null, 'jaJP')}
          />
          <Flag className='flag'
            name='tw'
            onClick={switchLanguage.bind(null, 'zhTW')}
          />
        </div>
      </Segment>

      <div className='main-container'>
        <Container>
          <Character.Catalog
            language={language}
          />
        </Container>
      </div>

      <Segment className='logo-banner' basic attached textAlign='center'>
        <Image size='small' centered src={logoUrl} />
      </Segment>
    </div>
  );
}

const styledApp = styled(App)`
  .logo-banner {
    background-color: #EC833D !important;
    border: none !important;

    .languages {
      position: absolute;
      top: 0;
      right: 0;

      .flag {
        cursor: pointer;
      }
    }
  }

  .main-container {
    background-color: #333333;
    padding: 3em 0;
  }
`;

export default styledApp;
