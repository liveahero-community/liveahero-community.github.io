// Node modules.
import _ from 'lodash';
import React from 'react';
import {
  Table,
} from 'semantic-ui-react';
// Local modules.
import { HeroData, SidekickData } from '../../models/Hero';

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
  path: 'skills' | 'equipmentSkills';
  card: HeroData | SidekickData;
  previousCard?: HeroData | SidekickData;
  hideCost?: boolean;
}

const DetailSkillTable: React.FC<DetailSkillTableProps> = (props) => {
  const { path, card, previousCard, hideCost } = props;

  const skills = path === 'equipmentSkills' && isSidekickData(card)
    ? card.equipmentSkills
    : card.skills;

  const previousSkills = path === 'equipmentSkills' && isSidekickData(previousCard)
    ? previousCard?.equipmentSkills
    : previousCard?.skills;

  return (
    <Table unstackable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>名稱</Table.HeaderCell>
          <Table.HeaderCell>說明</Table.HeaderCell>
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

export {
  DetailSkillTable,
};
