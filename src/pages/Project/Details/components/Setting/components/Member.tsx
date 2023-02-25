import {ProList} from '@ant-design/pro-components';
import {Button, Space, Tag} from 'antd';
import React from 'react';
import {getProjectServiceList} from '@/services/project/api';
import {ServiceStatus, ServiceTypes} from "@/services/project/serviceModel";


const ProjectMemberPage: React.FC<{ projectKey: string }> = ({projectKey}) => {

  return (
    <ProList<any>
      rowKey="name"
      request={(params => getProjectServiceList(projectKey, params))}
      metas={{
        title: {
          dataIndex: 'name',
        },
        description: {
          dataIndex: 'api',
        },
        subTitle: {
          render: (_, row) => {
            return (
              <Space size={0}>
                <Tag color={ServiceTypes[row.type]?.color}>{ServiceTypes[row.type]?.text}</Tag>
                <Tag color={ServiceStatus[row.status]?.color}>{ServiceStatus[row.status]?.text}</Tag>
              </Space>
            );
          },
        },
        content: {
          render: (_, row) => (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '200px',
                }}
              >
                {row.version ? row.version : '未发布'}
              </div>
            </div>
          ),
        },
        actions: {
          render: (text, row) => [
            <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
              编辑
            </a>,
            <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
              复制
            </a>,
            <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
              删除
            </a>,
          ],
        },
      }}
      toolbar={{
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        actions: [
          <Button type="primary" key="primary">
            发布版本
          </Button>,
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default ProjectMemberPage


