import {ProList} from '@ant-design/pro-components';
import {Button, Radio, RadioChangeEvent, Space, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {ApprovalTypes} from "@/services/project/constant";
import {getProjectServiceCount, getProjectServiceList} from '@/services/project/api';
import {renderBadge} from "@/common/common";
import CheckCardModal from "@/components/CheckCardModal";
import {PlusOutlined} from "@ant-design/icons";
import {history} from 'umi';
import {ServiceStatus, ServiceTypes} from "@/services/project/serviceModel";


const ProjectServicePage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('RELEASE');
  const [menuTabs, setMenuTabs] = useState<{ key: string; label: JSX.Element; }[]>();
  const [types, setTypes] = useState<any[]>();
  const [type, setType] = useState<string>('ALL');

  console.log("ProjectServicePage", projectKey)
  useEffect(() => {
    getProjectServiceCount(projectKey, {}).then(res => {
      if (res && res.success) {
        const countData = res.data;
        const approvalTypes: { key: string; label: JSX.Element; }[] = []
        Object.keys(ApprovalTypes).map(typeKey => {
          approvalTypes.push(
            {
              key: typeKey,
              label:
                <span>{ApprovalTypes[typeKey].text}{renderBadge(countData ? countData[typeKey.toLowerCase()] : 0, activeKey === typeKey)}</span>,
            },
          )
        })
        const typeTabs = [{
          value: 'ALL',
          label: <span>全部{renderBadge(countData ? countData.all : 0, activeKey === 'ALL')}</span>,
        }]

        Object.keys(ServiceTypes).map(item => {
          typeTabs.push(
            {
              value: item,
              label:
                <span>{ServiceTypes[item].text}{renderBadge(countData ? countData[item.toLowerCase()] : 0, activeKey === item)}</span>,
            },
          )
        })

        setTypes(typeTabs)
        setMenuTabs(approvalTypes)
      }
    })
  }, []);
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
                <Tag color={ServiceStatus[row.progress]?.color}>{ServiceStatus[row.progress]?.text}</Tag>
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
            <Button size="small" type="link" onClick={() => {
              history.push({
                pathname: `/project/${projectKey}/service/${row.type}/edit/${row.uuid}`
              })
            }}>副本编辑</Button>,
            <Button size="small" type="link" onClick={() => {
              history.push({
                pathname: `/project/${projectKey}/service/${row.type}/copy/${row.uuid}`
              })
            }}>复制</Button>,
            <Button size="small" type="link" onClick={() => {

            }}>废弃</Button>
          ],
        },
      }}
      toolbar={{
        menu: {
          activeKey,
          items: menuTabs,
          onChange(value) {
            setActiveKey(value);
          },
        },
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        actions: [
          <Radio.Group
            options={types}
            onChange={({target: {value}}: RadioChangeEvent) => {
              setType(value);
            }}
            value={type}
            optionType="button"
            buttonStyle="solid"
          />,
          <CheckCardModal title="新建接口" data={ServiceTypes} defaultValue="API" action={<><PlusOutlined/>新建接口</>}
                          onFinish={(value => {
                            history.push({
                              pathname: `/project/${projectKey}/service/${value}/new/init`
                            })
                          })}/>,
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default ProjectServicePage


