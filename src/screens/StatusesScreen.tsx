// Node modules.
import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import { StatusTable } from '../components/Status/StatusTable';

const StatusesScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Container text>
        <StatusTable language={language} />
      </Container>
    </Framework.Common>
  );
}

export {
  StatusesScreen,
};
