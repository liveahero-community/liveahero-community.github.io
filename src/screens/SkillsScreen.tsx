// Node modules.
import React, { useContext } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from '../configs/index';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';

const SkillsScreen: React.FC = () => {
  const { language, masterData } = useContext(AppContext);

  const skills = masterData?.skillData;

  console.log(masterData?.skillData);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`技能列表 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`技能列表`}</Header>

        {skills?.map((skill, i) => (
          <div key={i}>
            <p>{skill.skillId} / {skill.skillName} / {skill.characterType} / {skill.characterId}</p>
          </div>
        ))}
      </Container>
    </Framework.Common>
  );
}

export {
  SkillsScreen,
};
