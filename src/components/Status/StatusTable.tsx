// Node modules.
import _ from 'lodash';
import React, { useContext } from 'react';
import { Table } from 'antd';
// Local modules.
import { AppContext } from '../../contexts/AppContext';
// Local components.
import { StatusIcon } from '../Icon/';

const StatusTable: React.FC = () => {
  const { masterData } = useContext(AppContext);

  const data = _.values<Skill.StatusData>(masterData?.statusDict);
  const statuses = _.sortBy(data, (status) => !status.isGoodStatus);

  console.log('statuses', statuses);

  const columns = [
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'right' as 'right',
    },
    {
      dataIndex: 'icon',
      key: 'icon',
      align: 'center' as 'center',
    },
    {
      title: '說明',
      dataIndex: 'desciption',
      key: 'desciption',
    },
  ];

  const dataSource = _.map(statuses, (status) => ({
    key: status.statusId,
    status: status.statusName,
    icon: (
      <StatusIcon
        statusId={status.statusId}
        name={status.statusName}
        description={status.description}
      />
    ),
    desciption: status.description,
  }));

  return (
    <Table pagination={false}
      columns={columns}
      dataSource={dataSource}
    />
  );
}

export {
  StatusTable,
};
