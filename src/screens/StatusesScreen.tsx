// Node modules.
import React from 'react';
import { Container } from 'semantic-ui-react';
// Local modules.
import { Language } from '../models/System';
// Local components.
import * as Framework from '../components/Framework';
import { StatusTable } from '../components/Status/StatusTable';

interface StatusesScreenProps {
  useLanguage: [Language, React.Dispatch<React.SetStateAction<Language>>];
}

const StatusesScreen: React.FC<StatusesScreenProps> = (props) => {
  const { useLanguage } = props;

  const [language] = useLanguage;

  return (
    <Framework.Common useLanguage={useLanguage} >
      <Container text>
        <StatusTable language={language} />
      </Container>
    </Framework.Common>
  );
}

export {
  StatusesScreen,
};
