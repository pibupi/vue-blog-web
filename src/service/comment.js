import axios from './index';
export const sendComment = data => {
  return axios.request({
    url: '/api/v1/web/comment/add',
    data,
    method: 'post'
  });
};
export const sendAnswerComment = data => {
  return axios.request({
    url: '/api/v1/web/comment/answer/add',
    data,
    method: 'post'
  });
};
