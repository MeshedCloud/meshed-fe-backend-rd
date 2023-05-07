import {ActionType, PageContainer, ProList} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {deleteMember, getMemberList} from '@/services/project/api';
import {DeleteOutlined} from "@ant-design/icons";
import ConfirmButton from "@/components/ConfirmButton";
import {success} from "@/common/messages";
import MemberForm from "@/pages/Member/components/MemberForm";
import {Space} from "antd";


const ProjectMemberPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProList<any>
        rowKey="name"
        actionRef={actionRef}
        request={getMemberList}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            render: (_, row) => {
              return (
                <Space>
                  {row.loginId ? <span>{row.loginId}@meshed.onaliyun.com</span> : <></>}
                </Space>
              );
            },
          },
          subTitle: {},
          content: {
            render: (_, row) => {
              return (
                <Space>
                  {row.email ? <span>{row.email}</span> : <></>}
                  {row.phone ? <span>{row.phone}</span> : <></>}
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <ConfirmButton
                label="移除" hint="确定从研发中移除成员？仅影响研发相关账号，并不会注销账号" size="small" type="link" tip="仅从研发中心移除，会影响研发相关账号"
                icon={<DeleteOutlined/>}
                onConfirm={async e => {
                  const res = await deleteMember(row.id)
                  success(res)
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,
            ],
          },
        }}
        toolbar={{
          actions: [
            <MemberForm onFinish={() => actionRef.current?.reload()}/>,
          ],
        }}
        pagination={{
          pageSize: 10,
        }}
      />
    </PageContainer>
  );
};

export default ProjectMemberPage


