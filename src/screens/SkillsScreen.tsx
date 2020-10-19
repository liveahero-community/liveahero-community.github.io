// Node modules.
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Header,
  Segment,
  Label,
  Message,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
// Local modules.
import * as Config from '../configs/index';
import { EffectClass } from '../models/Skill';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import * as Skill from '../components/Skill';

const SkillsScreen: React.FC = () => {
  const { language, masterData } = useContext(AppContext);

  const [effectClasses, updateEffectClasses] = useState<EffectClass[]>([]);
  const [selectedEffectClass, updateSelectedEffectClass] = useState<EffectClass>('SpdDeferenceDamage');

  useEffect(() => {
    // TODO: refactor in future.
    const newEffectClasses = _.uniq(_.flattenDeep(masterData?.skillData?.map((skill) =>
      skill.effects.map((effect: any) =>
        effect.effectDetail.effects.map((effect: any) => effect.class)
      )
    )));
    updateEffectClasses(newEffectClasses);
  }, [masterData]);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`技能列表 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`技能列表`}</Header>

        <Message info>
          <p>{`點選右下方篩選按鈕，開始過濾指定技能類型`}</p>
          <p>{`此功能目前仍在開發中，初步版本可以先行體驗，部分資訊尚未翻譯完全`}</p>
        </Message>

        <Segment basic>
          <Label>
            {selectedEffectClass}
          </Label>
        </Segment>

        <Skill.Catalog
          selectedEffectClass={selectedEffectClass}
        />
      </Container>

      <Skill.CatalogFilter
        effectClasses={effectClasses}
        updateSelectedEffectClass={updateSelectedEffectClass}
      />
    </Framework.Common>
  );
}

export {
  SkillsScreen,
};
