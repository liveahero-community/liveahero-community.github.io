// Node modules.
import _ from 'lodash';
import React from 'react';
import {
  Table,
  Popup,
  Image,
  Label,
} from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import { HeroData, SidekickData } from '../../models/Hero';
import { statusIcons } from '../../utils/Mapping';

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

interface SkillCellProps {
  wrap?: boolean;
  textAlign?: 'center' | 'right';
  current: string | number;
  previous?: string | number;
}

const SkillCell: React.FC<SkillCellProps> = (props) => {
  const { wrap, textAlign, current, previous } = props;

  if (previous && current !== previous) {
    return <Table.Cell positive textAlign={textAlign}>
      <div>{wrap ? wrapDescription(previous) : previous}</div>
      <div>⬇</div>
      <div>{wrap ? wrapDescription(current) : current}</div>
    </Table.Cell>;
  }

  return (
    <Table.Cell textAlign={textAlign}>
      {wrap ? wrapDescription(current) : current}
    </Table.Cell>
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
    <Table className={className} unstackable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>名稱</Table.HeaderCell>
          <Table.HeaderCell>說明</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>狀態</Table.HeaderCell>
          {!hideCost &&
            <Table.HeaderCell textAlign='right'>消耗 view</Table.HeaderCell>
          }
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {skills.map((skill, i) => (
          <Table.Row key={i}>
            <Table.Cell>{skill.skillName}</Table.Cell>

            <SkillCell wrap
              current={skill.description}
              previous={previousSkills && previousSkills[i].description}
            />

            <Table.Cell>
              <div className='status-list'>
                {skill.effects.filter((e) => e.effectDetail.turn > 0).map((effect, i) =>
                  <Popup inverted key={i}
                    trigger={
                      <div className='status'>
                        <Image className='icon'
                          src={_.get(statusIcons, effect.effectDetail.statusId)}
                        />
                        <Label className='turn' circular color='grey' size='tiny'>
                          {effect.effectDetail.turn}
                        </Label>
                      </div>
                    }
                    content={`${effect.effectDetail.status?.statusName}: ${effect.effectDetail.status?.description}`}
                  />
                )}
              </div>
            </Table.Cell>

            {!hideCost &&
              <SkillCell textAlign='right'
                current={skill.useView}
                previous={previousSkills && previousSkills[i].useView}
              />
            }
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const styledDetailSkillTable = styled(DetailSkillTable)`
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
