import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import {history} from '@umijs/max';
import {message, notification} from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errCode?: string;
  errMessage?: string;
  showType?: ErrorShowType;
}

function errorMessage(errorInfo: ResponseStructure | undefined) {
  if (errorInfo) {
    const {errMessage, errCode} = errorInfo;
    switch (errorInfo.showType) {
      case ErrorShowType.SILENT:
        // do nothing
        break;
      case ErrorShowType.WARN_MESSAGE:
        message.warn(errMessage);
        break;
      case ErrorShowType.ERROR_MESSAGE:
        message.error(errMessage);
        break;
      case ErrorShowType.NOTIFICATION:
        notification.open({
          description: errMessage,
          message: errCode,
        });
        break;
      case ErrorShowType.REDIRECT:
        // TODO: redirect
        break;
      default:
        message.error(errMessage);
    }
  }
  console.log(
    `很糟糕，出bug了,哦,也可能不是，没事改改就好啦! errCode : ${errorInfo?.errCode} errMessage : ${errorInfo?.errMessage}`,
  );
}

const loginPath = '/user/login';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const {success, data, errCode, errMessage, showType} = res as unknown as ResponseStructure;
      console.log("errorThrower", success, errMessage);

      if (!success) {
        const error: any = {
          name: 'BizError',
          info: {errCode, errMessage, showType, data},
        };

        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
        errorMessage(error.info);
      } else if (error.response) {
        const response = error.response;
        console.log(response);
        if (response.status === 401) {
          // 401 权限错误,清除本地token重新登入
          const token = localStorage.getItem("TOKEN");
          if (token) {
            response.data.errMessage = "登入过期"
          }
          localStorage.removeItem("TOKEN")
          errorMessage(response.data)


          const mode = localStorage.getItem('mode');
          if (mode === 'base') {
            window.location.href = window.location.origin + loginPath
          } else {
            history.push(loginPath);
          }

        } else if (response.data) {
          // Axios 的错误
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          errorMessage(response.data)
        } else {
          message.error('服务请求异常');
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = localStorage.getItem("TOKEN");
      const authHeader = {Authorization: token};
      // 拦截请求配置，进行个性化处理。
      if (config?.params?.current) {
        config.params.pageIndex = config?.params?.current;
        delete config.params.current;
      }
      //
      return {...config, headers: authHeader};
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const {data} = response as unknown as ResponseStructure;
      if (data.totalCount) {
        data.total = data.totalCount;
      }
      return response;
    },
  ],
};
