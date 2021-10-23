// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../../contexts/AppContext';

interface ParallelWeaponTableProps {
  isSimple?: boolean;
}

const ParallelWeaponTable: React.FC<ParallelWeaponTableProps> = (props) => {
  const { isSimple = true } = props;
  const { masterData } = useContext(AppContext);

  const expList = masterData?.parallelWeaponExpData
    .filter((expData) => !isSimple || (isSimple && expData.level % 10 === 0))
    .reverse();

  if (expList === undefined) {
    return null;
  }

  return (
    <Table unstackable selectable compact>
      <Table.Header>
        <Table.Row textAlign='right'>
          <Table.HeaderCell>等級</Table.HeaderCell>
          {!isSimple && <Table.HeaderCell>升級所需石英</Table.HeaderCell>}
          <Table.HeaderCell>累積石英</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {_.map(expList, (expData, i) => (
          <Table.Row key={i} textAlign='right'>
            <Table.Cell>{expData.level}</Table.Cell>
            {!isSimple && <Table.Cell>{Number(expData.nextExp).toLocaleString()}</Table.Cell>}
            <Table.Cell>{Number(expData.totalExp).toLocaleString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export {
  ParallelWeaponTable,
};
