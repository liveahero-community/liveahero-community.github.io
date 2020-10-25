// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Local modules.
import * as Routes from '../../utils/Routes';
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
  selectedEffectClass: Skill.EffectClass;
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { className } = props;
  const { selectedEffectClass } = props;

  const { masterData } = useContext(AppContext);

  // Refactor in future.
  const skills = masterData?.skillData.filter((skill) => {
    const matchedSkills = skill.effects.filter((effect: any) => {
      const matchedEffects = effect.effectDetail.effects.filter((effectDetail: any) => {
        return selectedEffectClass === effectDetail.class;
      });
      return !_.isEmpty(matchedEffects);
    });
    return !_.isEmpty(matchedSkills);
  });

  console.log('selectedEffectClass', selectedEffectClass);
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
              <div>{wrapDescription(skill.description)}</div>
            </div>

            <div className='character-icon'>
              <Link to={`${Routes.HEROES}/${skill.characterId}`}>
                {skill.characterType === 'hero' &&
                  <Image alt='' src={`/assets/icon/item/item_piece_${skill.characterResourceName}.png`} />
                }

                {skill.characterType === 'sidekick' &&
                  <Image alt='' src={`/assets/icon/item/item_heart_${skill.characterResourceName}.png`} />
                }
              </Link>
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
