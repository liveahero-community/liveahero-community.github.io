// Node modules.
import React from 'react';
import {
  Table,
} from 'semantic-ui-react';
// Local modules.
import { HeroData, SidekickData } from '../../models/Hero';

interface CharacterStatusCellProps {
  current: number;
  previous?: number;
}

const CharacterStatusCell: React.FC<CharacterStatusCellProps> = (props) => {
  const { current, previous } = props;

  if (previous && current !== previous) {
    return (
      <Table.Cell positive>{previous}➜{current}</Table.Cell>
    );
  }

  return (
    <Table.Cell>{current}</Table.Cell>
  );
};

interface CharacterDetailStatusTableProps {
  card: HeroData | SidekickData;
  previousCard?: HeroData | SidekickData;
}

const CharacterDetailStatusTable: React.FC<CharacterDetailStatusTableProps> = (props) => {
  const { card, previousCard } = props;

  return (
    <Table unstackable compact>
      <Table.Header>
        <Table.Row textAlign='right'>
          <Table.HeaderCell width={1} textAlign='center'>等級</Table.HeaderCell>
          <Table.HeaderCell width={3}>血量</Table.HeaderCell>
          <Table.HeaderCell width={3}>攻擊力</Table.HeaderCell>
          <Table.HeaderCell width={3}>速度</Table.HeaderCell>
          <Table.HeaderCell width={3}>view</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {card?.growths.map((growth, i) => (
          <Table.Row key={i} textAlign='right'>
            <Table.Cell textAlign='center'>{growth.level}</Table.Cell>
            <CharacterStatusCell current={growth.hp} previous={previousCard?.growths[i].hp} />
            <CharacterStatusCell current={growth.attack} previous={previousCard?.growths[i].attack} />
            <CharacterStatusCell current={growth.agility} previous={previousCard?.growths[i].agility} />
            <CharacterStatusCell current={growth.addView} previous={previousCard?.growths[i].addView} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export {
  CharacterDetailStatusTable,
};
