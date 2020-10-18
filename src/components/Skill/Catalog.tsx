// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import { EffectClass } from '../../models/Skill';
import { AppContext } from '../../contexts/AppContext';
// Local components.
import { SkillIcon } from '../Icon/';

interface CatalogProps {
  className?: string;
  selectedEffectClasses: EffectClass[];
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { className } = props;
  const { selectedEffectClasses } = props;

  const { masterData } = useContext(AppContext);

  // Refactor in future.
  const skills = masterData?.skillData.filter((skill) => {
    const matchedSkills = skill.effects.filter((effect: any) => {
      const matchedEffects = effect.effectDetail.effects.filter((effectDetail: any) => {
        return _.includes(selectedEffectClasses, effectDetail.class);
      });
      return !_.isEmpty(matchedEffects);
    });
    return !_.isEmpty(matchedSkills);
  });

  console.log('selectedEffectClasses', selectedEffectClasses);
  console.log('skills', skills);

  return (
    <div className={className}>
      {skills?.map((skill, i) => (
        <Segment id={skill.skillId} key={i}>
          <Header>{skill.skillName}</Header>
          
          <div className='section'>
            <SkillIcon skill={skill} />
            <p>{skill.description}</p>
          </div>

          <div className='section'>
            {`可學習人物:`}

            <div className='character-icon'>
              {skill.characterType === 'hero' &&
                <Image alt='' src={`/assets/icon/item/item_piece_${skill.characterResourceName}.png`} />
              }

              {skill.characterType === 'sidekick' &&
                <Image alt='' src={`/assets/icon/item/item_heart_${skill.characterResourceName}.png`} />
              }
            </div>
          </div>

          {/* <p>{JSON.stringify(skill.effects.map((effect: any) => effect.effectDetail.effects))}</p> */}
        </Segment>
      ))}
    </div>
  );
}

const styledCatalog = styled(Catalog)`
  .section {
    display: flex;
    align-items: center;
  }

  .character-icon {
    width: 45px;
  }
`;

export {
  styledCatalog as Catalog,
};
