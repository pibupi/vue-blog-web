import axios from './index';
export const register = userInfo => {
  return axios.request({
    url: '/api/v1/admin/user/register',
    data: userInfo,
    method: 'post'
  });
};
export const login = userInfo => {
  return axios.request({
    url: '/api/v1/admin/user/login',
    data: userInfo,
    method: 'post'
  });
};
