import axios from "./index";
export const getArticleList = () => {
  return axios.request({
    url: "/api/v1/article/alllist",
    method: "get"
  });
};
export const getSingArticle = id => {
  return axios.request({
    url: `/api/v1/article/${id}`,
    method: "get"
  });
};
