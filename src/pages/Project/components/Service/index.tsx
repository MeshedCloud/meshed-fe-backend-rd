import {ActionType, ProList} from '@ant-design/pro-components';
import type {RadioChangeEvent} from 'antd';
import {Button, Radio, Space, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {ReleaseStatus} from "@/services/project/constant";
import {getProjectServiceList, getProjectServiceReleaseCount} from '@/services/project/api';
import {renderBadge} from "@/common/common";
import {history} from 'umi';
import {RequestTypes, ServiceStatus, ServiceTypes} from "@/services/project/serviceModel";
import ServiceAddForm from "@/pages/Project/components/Service/components/ServiceAddForm";
import {convertVersion} from "@/common/utils";


const ProjectServicePage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('RELEASE');
  const [keyword, setKeyword] = useState<React.Key | undefined>();
  const [type, setType] = useState<React.Key | undefined>('ALL');
  const [menuTabs, setMenuTabs] = useState<{ key: string; label: JSX.Element; }[]>();
  const [types, setTypes] = useState<any[]>();
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    getProjectServiceReleaseCount(projectKey, {}).then(res => {
      if (res && res.success) {
        const countData = res.data;
        const approvalTypes: { key: string; label: JSX.Element; }[] = []
        Object.keys(ReleaseStatus).map(typeKey => {
          approvalTypes.push(
            {
              key: typeKey,
              label:
                <span>{ReleaseStatus[typeKey].text}{renderBadge(countData ? countData[typeKey.toLowerCase()] : 0, activeKey === typeKey)}</span>,
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
      actionRef={actionRef}
      request={(params => getProjectServiceList(projectKey, {
        ...params,
        releaseStatus: activeKey,
        type: type === 'ALL' ? undefined : type,
        keyword
      }))}
      metas={{
        title: {
          render: (_, row) => {
            return (
              <Button size="small" type="link" onClick={() => {
                history.push({
                  pathname: `/project/service/${projectKey}/read/${row.groupId}/${row.uuid}`
                })
              }}>{row.groupName} | {row.name}</Button>
            )
          }
        },
        description: {
          render: (_, row) => {
            return (
              <>
                <Tag color={RequestTypes[row.requestType]?.color}>{row.requestType}</Tag>
                {row.preUri}{row.type === 'RPC' ? '#' : ''}{row.uri}
              </>
            )
          }
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
                <Space size={0}>
                  <Tag
                    color={ServiceStatus[row.status]?.color}>{convertVersion(row.version)}-{ServiceStatus[row.status]?.text}</Tag>

                </Space>

              </div>
            </div>
          ),
        },
        actions: {
          render: (text, row) => [
            <Button size="small" type="link" onClick={() => {
              history.push({
                pathname: `/project/service/${projectKey}/edit/${row.groupId}/${row.uuid}`
              })
            }}>副本编辑</Button>,
            <Button size="small" type="link" onClick={() => {
              history.push({
                pathname: `/project/service/${projectKey}/copy/${row.groupId}/${row.uuid}`
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
            if (actionRef.current) {
              actionRef.current.reload();
            }
          },
        },
        search: {
          onSearch: (value: string) => {
            setKeyword(value);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          },
        },
        actions: [
          <Radio.Group
            options={types}
            onChange={({target: {value}}: RadioChangeEvent) => {
              setType(value);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            value={type}
            optionType="button"
            buttonStyle="solid"
          />,
          <ServiceAddForm projectKey={projectKey} operate="new" uuid="init"/>
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default ProjectServicePage

