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

const wrapDescription = (description?: any) => {
  if (_.isString(description)) {
    return description.split('。').filter(Boolean).map((token, i) => (
      <div key={i}>
        {`${token}。`}
      </div>
    ));
  }

  return description;
};

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
          <div className='section'>
            {skill.characterType === 'hero' &&
              <div className='skill-icon'>
                <SkillIcon skill={skill} />
              </div>
            }

            <div className='description'>
              <Header as='h3' dividing>
                {skill.skillName}
              </Header>
              <p>{wrapDescription(skill.description)}</p>
            </div>

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

    .skill-icon {
      margin-right: 1em;
    }

    .description {
      flex: 1;
    }

    .character-icon {
      width: 45px;
      margin-left: 1em;
    }
  }
`;

export {
  styledCatalog as Catalog,
};
