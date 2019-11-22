import axios from "./index";
export const getArticleList = ({ current, pageSize, keywords }) => {
  console.log(current, pageSize);
  return axios.request({
    url: "/api/v1/web/article/list",
    params: {
      current,
      pageSize,
      keywords
    },
    method: "get"
  });
};
export const getSingArticle = id => {
  return axios.request({
    url: `/api/v1/web/article/${id}`,
    method: "get"
  });
};
export const getCategoryArticle = category_id => {
  return axios.request({
    url: `/api/v1/web/articleOfCategory/${category_id}`,
    method: "get"
  });
};
