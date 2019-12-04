import axios from "./index";
// import jwtToken from "jwt-decode";
export const getArticleList = ({ current, pageSize, keywords }) => {
  return axios.request({
    url: "/v1/web/article/list",
    params: {
      current,
      pageSize,
      keywords
    },
    method: "get"
  });
};
export const getSingArticle = ({ article_id, user_id }) => {
  return axios.request({
    url: `/api/v1/web/article`,
    params: {
      article_id,
      user_id
    },
    method: "get"
  });
};
export const getCategoryArticle = category_id => {
  return axios.request({
    url: `/api/v1/web/articleOfCategory/${category_id}`,
    method: "get"
  });
};
export const clickLikeArticle = data => {
  return axios.request({
    url: `/api/v1/web/click/like`,
    data,
    method: "post"
  });
};
