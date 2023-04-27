import {ActionType, ProList} from '@ant-design/pro-components';
import {Button, Space, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {ReleaseStatus} from "@/services/project/constant";
import {
  completeProjectModel,
  deleteProjectModel,
  discardProjectModel,
  getProjectModelList,
  getProjectModelReleaseCount,
  revokeProjectModel,
} from '@/services/project/api';
import {renderBadge} from "@/common/common";
import CheckCardModal from "@/components/CheckCardModal";
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
  RollbackOutlined,
  StopOutlined
} from "@ant-design/icons";
import {history} from 'umi';
import {ModelTypes} from "@/services/project/serviceModel";
import {convertVersion} from "@/common/utils";
import ConfirmButton from "@/components/ConfirmButton";
import {success} from "@/common/messages";


const MemberPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
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
            <Button icon={<FormOutlined/>} size="small" type="link" hidden={row.releaseStatus !== "EDIT"}
                    onClick={() => {
                      history.push({
                        pathname: `/project/model/${projectKey}/${row.type}/edit/${row.uuid}`
                      })
                    }}>编辑</Button>,
            <ConfirmButton
              label="副本编辑" hint="确定创建副本编辑？" size="small" type="link" tip="副本编辑"
              icon={<FormOutlined/>} hidden={row.releaseStatus !== "EDIT" || row.releaseStatus !== "PROCESSING"}
              onConfirm={async e => {
                history.push({
                  pathname: `/project/model/${projectKey}/${row.type}/edit/${row.uuid}`
                })
              }}
            />,
            <ConfirmButton
              label="复制" hint="确定复制服务？" size="small" type="link" tip="复制"
              icon={<CopyOutlined/>} hidden={!row.suspended}
              onConfirm={async e => {
                history.push({
                  pathname: `/project/model/${projectKey}/${row.type}/edit/${row.uuid}`
                })
              }}
            />,
            <ConfirmButton
              label="完成" hint="确定完成服务？" size="small" type="link" tip="完成"
              icon={<CheckOutlined/>} hidden={row.releaseStatus !== "EDIT"}
              onConfirm={async e => {
                const res = await completeProjectModel(row.uuid, {});
                if (res.success) {
                  actionRef.current?.reload()
                }
                success(res)
              }}
            />,
            <ConfirmButton
              label="撤销" hint="确定撤销服务？" size="small" type="link" tip="撤销"
              icon={<RollbackOutlined/>} hidden={row.releaseStatus !== "PROCESSING"}
              onConfirm={async e => {
                const res = await revokeProjectModel(row.uuid, {});
                if (res.success) {
                  actionRef.current?.reload()
                }
                success(res)
              }}
            />,
            <ConfirmButton
              label="废弃" hint="确定废弃服务？" size="small" type="link" tip="废弃"
              icon={<StopOutlined/>} hidden={row.releaseStatus !== "EDIT" || row.releaseStatus !== "PROCESSING"}
              onConfirm={async e => {
                const res = await discardProjectModel(row.uuid, {});
                if (res.success) {
                  actionRef.current?.reload()
                }
                success(res)
              }}
            />,
            <ConfirmButton
              label="删除" hint="确定删除服务？" size="small" type="link" tip="删除"
              icon={<DeleteOutlined/>} hidden={row.releaseStatus !== "EDIT"}
              onConfirm={async e => {
                const res = await deleteProjectModel(row.uuid, {});
                if (res.success) {
                  actionRef.current?.reload()
                }
                success(res)
              }}
            />
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

export default MemberPage


