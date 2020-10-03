// Node modules.
import React from 'react';
import { Container, Segment, Image } from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import * as Character from './components/Character';

interface AppProps {
  className?: string;
}

const App: React.FC<AppProps> = (props) => {
  const { className } = props;

  const logoUrl = '/assets/logo.png';

  return (
    <div className={className}>
      <Segment className='logo-banner' basic attached textAlign='center'>
        <Image size='medium' centered src={logoUrl} />
      </Segment>

      <div className='main-container'>
        <Container>
          <Character.Catalog />
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
  }

  .main-container {
    background-color: #333333;
    padding: 3em 0;
  }
`;

export default styledApp;
