// Node modules.
import _ from 'lodash';
import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
// Local modules.
import { HeroData, SidekickData } from '../../models/Hero';
// Local components.
import { SkillIcon, StatusIcon } from '../Icon/';

// TypeGraud.
const isSidekickData = (card?: HeroData | SidekickData): card is SidekickData => {
  return (card as SidekickData)?.equipmentSkills ? true : false;
}

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

interface SkillComparisonProps {
  wrap?: boolean;
  direction?: 'horizontal' | 'vertical';
  current: string | number;
  previous?: string | number;
}

const SkillComparison: React.FC<SkillComparisonProps> = (props) => {
  const { wrap, direction, current, previous } = props;

  if (previous && current !== previous) {
    return (direction === 'horizontal'
      ? <>
        <span className='legacy'>{wrap ? wrapDescription(previous) : previous}</span>
        <Icon name='caret square right outline' />
        <span className='updated'>{wrap ? wrapDescription(current) : current}</span>
      </>
      : <div>
        <div className='legacy'>{wrap ? wrapDescription(previous) : previous}</div>
        <Icon size='large' name='caret square down outline' />
        <div className='updated'>{wrap ? wrapDescription(current) : current}</div>
      </div>
    );
  }

  return (direction === 'horizontal'
    ? <>
      {wrap ? wrapDescription(current) : current}
    </>
    : <div>
      {wrap ? wrapDescription(current) : current}
    </div>
  );
};

interface DetailSkillTableProps {
  className?: string;
  path: 'skills' | 'equipmentSkills';
  card: HeroData | SidekickData;
  previousCard?: HeroData | SidekickData;
  hideCost?: boolean;
}

const DetailSkillTable: React.FC<DetailSkillTableProps> = (props) => {
  const { className } = props;
  const { path, card, previousCard, hideCost } = props;

  const skills = path === 'equipmentSkills' && isSidekickData(card)
    ? card.equipmentSkills
    : card.skills;

  const previousSkills = path === 'equipmentSkills' && isSidekickData(previousCard)
    ? previousCard?.equipmentSkills
    : previousCard?.skills;

  return (
    <Card.Group className={className} centered itemsPerRow={isMobile ? 1 : 3}>
      {skills.map((skill, i) => (
        <Card key={i} fluid>
          <Card.Content>
            <Card.Header>{skill.skillName}</Card.Header>

            {!hideCost &&
              <Card.Meta>
                {`View: `}
                <SkillComparison direction='horizontal'
                  current={skill.useView}
                  previous={previousSkills && previousSkills[i].useView}
                />
              </Card.Meta>
            }

            <Card.Description className='skill-description'>
              {path === 'skills' &&
                <SkillIcon skill={skill} />
              }

              <div className='text'>
                <SkillComparison wrap
                  current={skill.description}
                  previous={previousSkills && previousSkills[i].description}
                />
              </div>
            </Card.Description>
          </Card.Content>

          {skill.effects.filter((e) => e.effectDetail.turn > 0).length
            ? <Card.Content className='status-list' extra>
              {skill.effects.filter((e) => e.effectDetail.turn > 0).map((effect, i) =>
                <StatusIcon key={i}
                  statusId={effect.effectDetail.statusId}
                  name={effect.effectDetail.status?.statusName}
                  description={effect.effectDetail.status?.description}
                  turn={effect.effectDetail.turn}
                />
              )}
            </Card.Content>
            : null
          }
        </Card>
      ))}
    </Card.Group>
  );
}

const styledDetailSkillTable = styled(DetailSkillTable)`
  .skill-description {
    display: flex;
    justify-content: left;
    align-items: center;

    .text {
      flex: 1;
      padding-left: 0.25em;
    }
  }

  .legacy {
    color: #878787;
  }

  .updated {
    color: #2c662d;
  }

  .status-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

export {
  styledDetailSkillTable as DetailSkillTable,
};
