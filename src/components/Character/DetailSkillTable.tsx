// Node modules.
import _ from 'lodash';
import React from 'react';
import {
  Popup,
  Image,
  Label,
  Card,
} from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
// Local modules.
import { HeroData, SidekickData } from '../../models/Hero';
import { statusIcons } from '../../utils/Mapping';

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

interface StatusIconProps {
  statusId: number;
  name?: string;
  description?: string;
  turn: number;
}

const StatusIcon: React.FC<StatusIconProps> = (props) => {
  const { statusId, turn, name, description } = props;

  return (
    <Popup inverted
      trigger={
        <div className='status'>
          <Image className='icon'
            src={_.get(statusIcons, statusId)}
          />
          <Label className='turn' circular color='grey' size='tiny'>
            {turn}
          </Label>
        </div>
      }
      content={`${name}: ${description}`}
    />
  );
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
        {`➡️`}
        <span className='updated'>{wrap ? wrapDescription(current) : current}</span>
      </>
      : <>
        <div className='legacy'>{wrap ? wrapDescription(previous) : previous}</div>
        <div>⬇</div>
        <div className='updated'>{wrap ? wrapDescription(current) : current}</div>
      </>
    );
  }

  return (
    wrap ? wrapDescription(current) : current
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
            <Card.Description>
              <SkillComparison wrap
                current={skill.description}
                previous={previousSkills && previousSkills[i].description}
              />
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

    .status {
      position: relative;
      width: 36px;
      height: 36px;
      margin: 10px;

      .icon {
        width: 36px;
        height: 36px;
      }

      .turn {
        position: absolute;
        bottom: -9px;
        right: -9px;
      }
    }
  }
`;

export {
  styledDetailSkillTable as DetailSkillTable,
};
