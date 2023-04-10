import {history} from '@umijs/max';
import {Button, Result} from 'antd';
import React from 'react';
import {useMatch, useSearchParams} from "umi";

const ERR_MSG = {

  400: {
    title: '400',
    subTitle: '请求错误，您或许可以喝杯咖啡，让我和我的朋友们好好考虑一下如何处理它。'
  },
  403: {
    title: '403',
    subTitle: '哦，不！您似乎没有权限访问这个页面，要不您试试喝杯咖啡来放松一下？'
  },
  404: {
    title: '404',
    subTitle: '这个页面好像被一群鬼怪抓走了，所以我们无法提供给您！'
  },
  500: {
    title: '500',
    subTitle: '抱歉，服务器今天感到有些不舒服，我们正在给它喝药。'
  },
}
const ErrorPage: React.FC = () => {
  // @ts-ignore
  const {params: {code}} = useMatch('/error/:code')
  const [searchParams] = useSearchParams();

  const errCode = searchParams.get('errCode');
  const errMsg = searchParams.get('errMsg');

  return (

    <Result
      status={code === '400' ? 500 : code}
      title={errCode ? errCode : ERR_MSG[code].title}
      subTitle={errMsg ? errMsg : ERR_MSG[code].subTitle}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  )
};

export default ErrorPage;
