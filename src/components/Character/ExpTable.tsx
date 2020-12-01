// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../../contexts/AppContext';

interface ExpTableProps {
  mode: 'hero' | 'sidekick';
  isSimple?: boolean;
}

const ExpTable: React.FC<ExpTableProps> = (props) => {
  const { mode, isSimple = true } = props;
  const { masterData } = useContext(AppContext);

  const expDataRaw = mode === 'hero'
    ? masterData?.heroExpData
    : masterData?.sidekickExpData;

  if (expDataRaw === undefined) {
    return null;
  }

  const expList = Object.values(expDataRaw)
    .reverse()
    .filter((expData) => !isSimple || (isSimple && expData.level % 10 === 0));

  console.log(`${mode}ExpList`, expList);

  return (
    <Table unstackable selectable compact>
      <Table.Header>
        <Table.Row textAlign='right'>
          <Table.HeaderCell>等級</Table.HeaderCell>
          {!isSimple && <Table.HeaderCell>升級所需 EXP</Table.HeaderCell>}
          <Table.HeaderCell>累積 EXP</Table.HeaderCell>
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
  ExpTable,
};
