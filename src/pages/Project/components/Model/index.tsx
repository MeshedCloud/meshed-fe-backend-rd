import {ActionType, ProList} from '@ant-design/pro-components';
import {Button, Space, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {ReleaseStatus} from "@/services/project/constant";
import {getProjectModelList, getProjectModelReleaseCount,} from '@/services/project/api';
import {renderBadge} from "@/common/common";
import CheckCardModal from "@/components/CheckCardModal";
import {PlusOutlined} from "@ant-design/icons";
import {history} from 'umi';
import {ModelTypes} from "@/services/project/serviceModel";
import {convertVersion} from "@/common/utils";


const ProjectModelPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('RELEASE');
  const [keyword, setKeyword] = useState<React.Key | undefined>();
  const [menuTabs, setMenuTabs] = useState<{ key: string; label: JSX.Element; }[]>();
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    getProjectModelReleaseCount(projectKey, {}).then(res => {
      if (res && res.success) {
        const countData = res.data;
        const approvalTypes: { key: string; label: JSX.Element; }[] = []
        Object.keys(ReleaseStatus).map(item => {
          approvalTypes.push(
            {
              key: item,
              label:
                <span>{ReleaseStatus[item].text}{renderBadge(countData ? countData[item.toLowerCase()] : 0, activeKey === item)}</span>,
            },
          )
        })
        setMenuTabs(approvalTypes)
      }
    })
  }, []);
  return (
    <ProList<any>
      rowKey="name"
      actionRef={actionRef}
      request={(params => getProjectModelList(projectKey, {
        ...params,
        releaseStatus: activeKey,
        keyword
      }))}
      metas={{
        title: {
          dataIndex: 'className',
        },
        description: {
          dataIndex: 'name',
          render: (_, row) => {
            return (
              <Space size={0}>
                <Tag color={ModelTypes[row.type]?.color}>{ModelTypes[row.type]?.text}</Tag> {_}
              </Space>
            );
          }
        },
        subTitle: {},
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
                {convertVersion(row.version)}
              </div>
            </div>
          ),
        },
        actions: {
          render: (text, row) => [
            <Button size="small" type="link" onClick={() => {
              history.push({
                pathname: `/project/model/${projectKey}/${row.type}/edit/${row.uuid}`
              })
            }}>副本编辑</Button>,
            <Button size="small" type="link" onClick={() => {
              history.push({
                pathname: `/project/model/${projectKey}/${row.type}/copy/${row.uuid}`
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
          <CheckCardModal title="新建模型" data={ModelTypes} defaultValue="CMD" action={<><PlusOutlined/>新建接口</>}
                          onFinish={(value => {
                            history.push({
                              pathname: `/project/model/${projectKey}/${value}/new/init`
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

export default ProjectModelPage


