import {ProList} from '@ant-design/pro-components';
import {Button, Space, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {getProjectVersionCount, getProjectVersionList} from '@/services/deployment/api';
import {renderBadge} from "@/common/common";
import {WarehouseTypes} from "@/services/deployment/warehouse";


const ProjectVersionPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('ALL');
  const [menuTabs, setMenuTabs] = useState<{ key: string; label: JSX.Element; }[]>();
  useEffect(() => {
    getProjectVersionCount(projectKey, {}).then(res => {
      if (res && res.success) {
        const countData = res.data;
        const tabs = [{
          key: 'ALL',
          label: <span>全部项目{renderBadge(countData ? countData.all : 0, activeKey === 'ALL')}</span>,
        }]
        Object.keys(WarehouseTypes).map(key => {
          tabs.push(
            {
              key,
              label:
                <span>{WarehouseTypes[key].text}{renderBadge(countData ? countData[key.toLowerCase()] : 0, activeKey === key)}</span>,
            },
          )
        })
        setMenuTabs(tabs)
      }
    })
  });
  return (
    <ProList<any>
      rowKey="name"
      request={params => getProjectVersionList(projectKey, params)}
      metas={{
        title: {
          dataIndex: 'name',
        },
        description: {
          dataIndex: 'enname',
        },
        subTitle: {
          render: (_, row) => {
            return (
              <Space size={0}>
                <Tag color={WarehouseTypes[row.type]?.color}>{WarehouseTypes[row.type]?.text}</Tag>

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
                {row.version}
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
        menu: {
          activeKey,
          items: menuTabs,
          onChange(key) {
            setActiveKey(key);
          },
        },
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

export default ProjectVersionPage


