import axios from './index';
export const getCategory = () => {
  return axios.request({
    url: '/api/v1/web/category/all',
    method: 'get'
  });
};
