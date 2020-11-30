// Node modules.
import _ from 'lodash';
import React, { useCallback, useContext } from 'react';
import { Table } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../../contexts/AppContext';

const ExpTable: React.FC = () => {
  const { masterData } = useContext(AppContext);

  const userRankDataRaw = masterData?.userRankData;

  const estimateDuration = useCallback((totalExp: number) => {
    const staminaPerDay = 180;
    const earnExpPerDay = staminaPerDay * 10;
    return (totalExp / earnExpPerDay).toFixed(2);
  }, []);

  if (userRankDataRaw === undefined) {
    return null;
  }

  const userRanks = Object.values(userRankDataRaw).reverse();

  console.log('userRanks', userRanks);

  return (
    <Table unstackable selectable compact>
      <Table.Header>
        <Table.Row textAlign='right'>
          <Table.HeaderCell>等級</Table.HeaderCell>
          <Table.HeaderCell>體力上限</Table.HeaderCell>
          <Table.HeaderCell>升級所需 EXP</Table.HeaderCell>
          <Table.HeaderCell>累積 EXP</Table.HeaderCell>
          <Table.HeaderCell>估算遊玩天數</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {_.map(userRanks, (userRank, i) => (
          <Table.Row key={i} textAlign='right'>
            <Table.Cell>{userRank.userRank}</Table.Cell>
            <Table.Cell>{userRank.maxStamina}</Table.Cell>
            <Table.Cell>{Number(userRank.nextExp).toLocaleString()}</Table.Cell>
            <Table.Cell>{Number(userRank.totalExp).toLocaleString()}</Table.Cell>
            <Table.Cell>{estimateDuration(userRank.totalExp)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export {
  ExpTable,
};
