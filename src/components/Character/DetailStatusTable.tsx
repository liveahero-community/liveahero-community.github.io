// Node modules.
import React from 'react';
import { Table,Icon } from 'semantic-ui-react';
import styled from 'styled-components';

interface StatusCellProps {
  current: number;
  previous?: number;
}

const StatusCell: React.FC<StatusCellProps> = (props) => {
  const { current, previous } = props;

  if (previous && current !== previous) {
    return (
      <Table.Cell positive>
        {previous}
        <Icon className='upgrade-icon' name='caret square right outline' />
        {current}
      </Table.Cell>
    );
  }

  return (
    <Table.Cell>{current}</Table.Cell>
  );
};

interface DetailStatusTableProps {
  className?: string;
  card: DataExtend.HeroData | DataExtend.SidekickData;
  previousCard?: DataExtend.HeroData | DataExtend.SidekickData;
}

const DetailStatusTable: React.FC<DetailStatusTableProps> = (props) => {
  const { className } = props;
  const { card, previousCard } = props;

  return (
    <Table className={className} unstackable compact singleLine>
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
            <StatusCell current={growth.hp} previous={previousCard?.growths[i].hp} />
            <StatusCell current={growth.attack} previous={previousCard?.growths[i].attack} />
            <StatusCell current={growth.agility} previous={previousCard?.growths[i].agility} />
            <StatusCell current={growth.addView} previous={previousCard?.growths[i].addView} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const styledDetailStatusTable = styled(DetailStatusTable)`
  .upgrade-icon {
    margin: 0;
  }
`;

export {
  styledDetailStatusTable as DetailStatusTable,
};
