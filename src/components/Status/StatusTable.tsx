// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
// Local modules.
import { AppContext } from '../../contexts/AppContext';
// Local components.
import { StatusIcon } from '../Icon/';

interface StatusRowProps {
  status: any;
}

const StatusRow: React.FC<StatusRowProps> = (props) => {
  const { status } = props;

  return (
    <Table.Row
      positive={!!status.isGoodStatus}
      negative={!status.isGoodStatus}
    >
      <Table.Cell textAlign='right'>{status.statusName}</Table.Cell>
      <Table.Cell>
        <StatusIcon
          statusId={status.statusId}
          name={status.statusName}
          description={status.description}
        />
      </Table.Cell>
      <Table.Cell>{status.description}</Table.Cell>
    </Table.Row>
  );
};

const StatusTable: React.FC = () => {
  const { masterData } = useContext(AppContext);

  const groupedStatusDict = _.groupBy(masterData?.statusDict, (status) =>
    status.isGoodStatus ? 'buff' : 'debuff'
  );

  console.log('groupedStatusDict', groupedStatusDict);

  return (
    <Table unstackable selectable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='right'>狀態</Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell>說明</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {_.map(groupedStatusDict.buff, (status, i) => (
          <StatusRow key={i}
            status={status}
          />
        ))}

        {_.map(groupedStatusDict.debuff, (status, i) => (
          <StatusRow key={i}
            status={status}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export {
  StatusTable,
};
