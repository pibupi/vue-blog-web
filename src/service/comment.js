import axios from "./index";
export const sendComment = data => {
  return axios.request({
    url: "/api/v1/web/comment/add",
    data,
    method: "post"
  });
};
