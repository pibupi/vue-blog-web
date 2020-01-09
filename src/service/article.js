import axios from './index';
// import jwtToken from "jwt-decode";
export const getArticleList = ({
  current,
  pageSize,
  keywords,
  displayName
}) => {
  return axios.request({
    url: '/api/v1/web/article/list',
    params: {
      current,
      pageSize,
      keywords,
      username: displayName
    },
    method: 'get'
  });
};
export const getSingArticle = ({ article_id, user_id }) => {
  return axios.request({
    url: '/api/v1/web/article',
    params: {
      article_id,
      user_id
    },
    method: 'get'
  });
};
export const getCategoryArticleService = data => {
  return axios.request({
    url: '/api/v1/web/articleOfCategory',
    params: {
      category_id: data.category_id,
      current: data.current,
      pageSize: data.pageSize,
      username: data.displayName
    },
    method: 'get'
  });
};
export const clickLikeArticle = data => {
  return axios.request({
    url: '/api/v1/web/click/like',
    data,
    method: 'post'
  });
};
