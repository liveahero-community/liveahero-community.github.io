// Node modules.
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Table,
} from 'semantic-ui-react';
// Local modules.
import { Language } from '../../models/System';
import { allStatusDict } from '../../utils/DataProcess';

interface StatusTableProps {
  language: Language;
}

const StatusTable: React.FC<StatusTableProps> = (props) => {
  const { language } = props;

  const [statusDict, setStatusDict] = useState(allStatusDict[language]);

  useEffect(() => {
    setStatusDict(allStatusDict[language]);
  }, [language]);

  return (
    <Table unstackable selectable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='right'>狀態</Table.HeaderCell>
          <Table.HeaderCell>說明</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {_.map(statusDict, (status, i) => (
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
