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
    <Popup inverted position='top center'
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
      : <div>
        <div className='legacy'>{wrap ? wrapDescription(previous) : previous}</div>
        <div>⬇</div>
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
                <div className='skill-icon'>
                  <Image className='main' alt=''
                    src={`/assets/icon/skill/main/${skill.resourceName}.png`}
                  />
                  {skill.subResourceName &&
                    <Image className='sub' alt=''
                      src={`/assets/icon/skill/sub/${skill.subResourceName}.png`}
                    />
                  }
                </div>
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

    .skill-icon {
      flex: 0 0 48px;
      position: relative;
      width: 48px;
      height: 48px;

      .main {
        position: relative;
        width: 48px;
        height: 48px;
      }

      .sub {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 28px;
        height: 28px;
      }
    }

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
