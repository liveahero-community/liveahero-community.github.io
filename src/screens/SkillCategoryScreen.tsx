// Node modules.
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from '../configs/index';
import { effectClassTransform } from '../utils/Transformer';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as SkillList from '../components/Skill';

const SkillCategoryScreen: React.FC = () => {
  const { language, masterData } = useContext(AppContext);

  const { category } = useParams<any>();

  console.log(category);

  const [effectClasses, updateEffectClasses] = useState<Skill.EffectClass[]>([]);
  const [selectedEffectClass, setSelectedEffectClass] = useState<Skill.EffectClass>(category);

  useEffect(() => {
    // TODO: refactor in future.
    const newEffectClasses = _.uniq(_.flattenDeep(masterData?.skillData?.map((skill) =>
      skill.effects.map((effect: any) =>
        effect.effectDetail.effects.map((effect: any) => effect.class)
      )
    )));
    updateEffectClasses(newEffectClasses);
  }, [masterData]);

  // Update selected effect class when redirecting.
  useEffect(() => {
    setSelectedEffectClass(category);
  }, [category]);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`技能列表 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`技能列表`}</Header>

        <Segment basic>
          <Divider horizontal inverted>
            {`類型: ${effectClassTransform(selectedEffectClass)}`}
          </Divider>
        </Segment>

        <SkillList.Catalog
          selectedEffectClass={selectedEffectClass}
        />
      </Container>

      <SkillList.CatalogFilter
        effectClasses={effectClasses}
      />
    </Framework.Common>
  );
}

export {
  SkillCategoryScreen,
};
