import { selectPage, generatorCode } from '@/services/tableInformationService';
import update from 'immutability-helper';
const Model = {
  namespace: 'tableInformation',
  state: {
    tableInformationPage: undefined,
    selectedRowKeys: [],
  },
  effects: {
    *selectPage({ payload }, { call, put }) {
      const response = yield call(selectPage, payload);
      yield put({
        type: 'saveTableInformation',
        payload: response,
      });
    },
    *generatorCode({ payload }, { call, put }) {
      //   const response = yield call(generatorCode, payload);
      //   location.href = "sys/generator/code?tables=" + tableNames.join();
      const url = '/tableInformation/generatorCode';
      const tempForm = document.createElement('form');
      tempForm.action = url;
      tempForm.method = 'post';
      tempForm.style.display = 'none';
      let opt = document.createElement('textarea');
      opt.name = 'tableNameList';
      opt.value = payload;
      tempForm.appendChild(opt);
      document.body.appendChild(tempForm);
      tempForm.submit();
      return '代码生成成功';
    },
  },
  reducers: {
    saveTableInformation(state, action) {
      return { ...state, tableInformationPage: action.payload || {} };
    },

    tableInformationSelectedRowKeysUpdate(state, action) {
      return update(state, {
        selectedRowKeys: { $set: action.payload },
      });
    },
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
