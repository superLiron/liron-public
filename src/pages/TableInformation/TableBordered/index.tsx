import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Table } from 'antd';

const columns = [
  {
    title: '表名',
    dataIndex: 'tableName',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'engine',
    // className: 'column-money',
    dataIndex: 'engine',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

const tablePage = (props) => {
  const { tableInformationPage, pagination, rowsCount, dispatch } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const search = (pageNumber, pageSize) => {
    if (dispatch) {
      dispatch({
        type: 'tableInformation/selectPage',
        payload: {
          pageNumber,
          pageSize,
        },
      });
    }
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);

    props.dispatch({
      type: 'tableInformation/tableInformationSelectedRowKeysUpdate',
      payload: selectedRowKeys,
    });

    // props.dispatch({
    //   type: 'tableInformation/update',
    //   payload: { selectedRowKeys: selectedRowKeys },
    // });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          rowKey={'tableName'}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={!tableInformationPage ? [] : tableInformationPage.data}
          bordered
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: rowsCount,
            onChange: (pageNumber, pageSize) => {
              search(pageNumber, pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default connect((state: any) => {
  const tableInformationPage = state.tableInformation.tableInformationPage;
  return {
    tableInformationPage: tableInformationPage,
    pagination: {
      current: tableInformationPage === undefined ? 1 : tableInformationPage.pageIndex,
      pageSize: tableInformationPage === undefined ? 2 : tableInformationPage.pageSize,
    },
    rowsCount: tableInformationPage === undefined ? 0 : tableInformationPage.rowsCount,
  };
})(tablePage);
