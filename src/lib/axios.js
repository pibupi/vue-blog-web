import axios from 'axios';
import { baseURL } from '@/config';
import { Loading } from 'element-ui';
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config;
  }
  distroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show()
        }
        this.queue[url] = true;
        if (token) {
          config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      res => {
        this.distroy(url);
        const { data } = res;
        return data;
      },
      error => {
        this.distroy(url);
        return Promise.reject(error.response.data);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
