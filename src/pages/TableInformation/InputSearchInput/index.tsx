import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { Input, Button, message } from 'antd';
import { connect } from 'dva';
const { Search } = Input;

const SearchInput = (props) => {
  const { dispatch, tableInformation } = props;
  const { selectedRowKeys } = tableInformation;

  const [tableNameLike, setTableNameLike] = useState('');
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'tableInformation/selectPage',
        payload: {
          pageNumber: 1,
          pageSize: 10,
          tableNameLike,
        },
      });
    }
  }, []);

  const search = () => {
    if (dispatch) {
      dispatch({
        type: 'tableInformation/selectPage',
        payload: {
          pageNumber: 1,
          pageSize: 10,
          tableNameLike,
        },
      });
    }
  };

  const generatorCode = () => {
    if (selectedRowKeys === undefined || selectedRowKeys.length === 0) {
      message.error('请选择数据');
      return;
    }

    dispatch({
      type: 'tableInformation/generatorCode',
      payload: selectedRowKeys,
    }).then((resopnse) => {
      message.success(resopnse);
    });
  };

  return (
    <div className={styles.container}>
      <div id="components-input-demo-search-input">
        <div>
          <div className={styles.eachdiv}>
            <label className={styles.label}>表名</label>
            <Input
              placeholder={'请输入'}
              onChange={(e: any) => {
                setTableNameLike(e.target.value);
              }}
            />
          </div>
          {/* <div className={styles.eachdiv}>
            <label className={styles.label}>表名2</label>
            <Input placeholder={'请输入'} />
          </div> */}
          <div className={styles.buttonRight}>
            <Button
              type="primary"
              className={styles.button}
              onClick={() => {
                search();
              }}
            >
              搜索
            </Button>
            {/* <Button className={styles.button}>重置</Button> */}
            <Button
              type="primary"
              className={styles.button}
              onClick={() => {
                generatorCode();
              }}
            >
              生成代码
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ tableInformation }) => ({
  tableInformation,
}))(SearchInput);
