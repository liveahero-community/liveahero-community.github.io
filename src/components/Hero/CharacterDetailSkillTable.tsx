// Node modules.
import _ from 'lodash';
import React from 'react';
import {
  Table,
} from 'semantic-ui-react';
// Local modules.
import { HeroData, SidekickData } from '../../models/Hero';

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

interface CharacterSkillCellProps {
  wrap?: boolean;
  textAlign?: 'center' | 'right';
  current: string | number;
  previous?: string | number;
}

const CharacterSkillCell: React.FC<CharacterSkillCellProps> = (props) => {
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

interface CharacterDetailSkillTableProps {
  card: HeroData | SidekickData;
  previousCard?: HeroData | SidekickData;
}

const CharacterDetailSkillTable: React.FC<CharacterDetailSkillTableProps> = (props) => {
  const { card, previousCard } = props;

  return (
    <Table unstackable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>名稱</Table.HeaderCell>
          <Table.HeaderCell>說明</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>消耗 view</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {card?.skills.map((skill, i) => (
          <Table.Row key={i}>
            <Table.Cell>{skill.skillName}</Table.Cell>

            <CharacterSkillCell wrap
              current={skill.description}
              previous={previousCard?.skills[i].description}
            />

            <CharacterSkillCell textAlign='right'
              current={skill.useView}
              previous={previousCard?.skills[i].useView}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export {
  CharacterDetailSkillTable,
};
