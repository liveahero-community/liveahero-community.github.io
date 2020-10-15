// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../../contexts/AppContext';

const StatusTable: React.FC = () => {
  const { masterData } = useContext(AppContext);

  return (
    <Table unstackable selectable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='right'>狀態</Table.HeaderCell>
          <Table.HeaderCell>說明</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {_.map(masterData?.statusDict, (status, i) => (
          <Table.Row key={i}
            positive={!!status.isGoodStatus}
            negative={!status.isGoodStatus}
          >
            <Table.Cell textAlign='right'>{status.statusName}</Table.Cell>
            <Table.Cell>{status.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export {
  StatusTable,
};
