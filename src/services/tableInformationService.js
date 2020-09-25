import request from '@/utils/request';
// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
// export async function selectPage() {
//   return request(`/tableInformation/selectPage`);
// }

export async function selectPage(params) {
  return request('/tableInformation/selectPage', {
    method: 'POST',
    data: params,
  });
}

export async function generatorCode(params) {
  return request('/tableInformation/generatorCode', {
    method: 'POST',
    data: params,
  });
}

// export async function generatorCode() {
//   return request(`/tableInformation/generatorCodeTest?tableName=user`);
// }
