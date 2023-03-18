import React from 'react';
import {ProCard, ProList} from "@ant-design/pro-components";
import {Button, Space} from "antd";
import Tag from 'antd/es/tag';
import {WarehouseTypes} from "@/services/deployment/warehouse";
import {getProjectWarehouseList} from "@/services/deployment/api";
import {ForkOutlined, LinkOutlined, PullRequestOutlined} from "@ant-design/icons";
import WarehouseAddForm from "@/pages/Project/components/Warehouse/components/WarehouseAddForm";


const ProjectWarehousePage: React.FC<{ projectKey: string }> = ({projectKey}) => {

  return (
    <ProCard style={{minHeight: 500}}>
      <ProList<any>
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: false,
        }}
        request={(params) => getProjectWarehouseList(projectKey, {...params})}
        postData={data => {
          if (data && data.length > 0) {
            data.forEach(item => item.avatar = "https://s.meshed.cn/meshed/svg/git.svg")
          }
          console.log(data)
          return data
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{gutter: 16, column: 3}}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color={WarehouseTypes[row.type]?.color}>{WarehouseTypes[row.type]?.text}</Tag>
                </Space>
              );
            }
          },
          type: {
            dataIndex: 'type',
          },
          content: {
            dataIndex: 'repoName',
          },
          avatar: {
            dataIndex: 'avatar',
          },
          actions: {
            cardActionProps: 'actions',
            render: (text, row) => [
              <Button size="small" type="link" icon={<ForkOutlined/>} onClick={() => {

              }}>分支</Button>,
              <Button size="small" type="link" icon={<PullRequestOutlined/>} onClick={() => {

              }}>PR</Button>,
              <Button size="small" type="link" icon={<LinkOutlined/>} onClick={() => {

              }}>HTTPS</Button>
            ],
          },
        }}
        headerTitle="项目仓库"
        toolBarRender={() => [
          <WarehouseAddForm projectKey={projectKey}/>
        ]
        }
      />
    </ProCard>
  );
};

export default ProjectWarehousePage


