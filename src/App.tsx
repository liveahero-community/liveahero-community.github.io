// Node modules.
import React from 'react';
import { Container, Segment, Image } from 'semantic-ui-react';
// Local modules.
import * as Character from './components/Character';

const App: React.FC = () => {
  const logUrl = 'https://live-a-hero.jp/wp-content/themes/liveahero/img/index/logo.png';

  return (
    <>
      <Segment basic attached textAlign='center' style={{ backgroundColor: '#EC833D' }}>
        <Image size='medium' centered src={logUrl} />
      </Segment>

      <div style={{ backgroundColor: '#333333', padding: '3em 0' }}>
        <Container>
          <Character.Catalog />
        </Container>
      </div>

      <Segment basic attached textAlign='center' style={{ backgroundColor: '#EC833D' }}>
        <Image size='small' centered src={logUrl} />
      </Segment>
    </>
  );
}

export default App;
