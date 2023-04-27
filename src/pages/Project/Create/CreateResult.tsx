import React from "react";
import {Button, Result} from "antd";
import {useMatch} from "@@/exports";
import {useSearchParams} from "umi";
import {history} from "@umijs/max";

const CreateResult: React.FC = () => {
  // @ts-ignore
  const {params: {result}} = useMatch('/project/create/:result')
  let title = "发起成功"
  if (result === 'success') {
    title = "发起成功"
  } else {
    title = "发起失败"
  }
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');

  return (
    <Result
      status={result}
      title={title}
      subTitle={message}
      extra={[
        <Button key="console" onClick={history.back}>
          继续发起
        </Button>,
        <Button type="primary" onClick={() => {
          history.push("/project")
        }}>返回项目列表</Button>,
      ]}
    />
  )
}

export default CreateResult
