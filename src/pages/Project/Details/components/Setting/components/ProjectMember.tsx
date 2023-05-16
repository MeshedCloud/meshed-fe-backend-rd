import {ActionType, ProList} from '@ant-design/pro-components';
import {Space, Tag} from 'antd';
import React, {useRef} from 'react';
import {deleteProjectMember, getProjectMemberList} from '@/services/project/api';
import {ProjectRoles} from "@/services/project/member";
import {DeleteOutlined} from "@ant-design/icons";
import {success} from "@/common/messages";
import ConfirmButton from "@/components/ConfirmButton";
import ProjectMemberForm from "@/pages/Project/Details/components/Setting/components/ProjectMemberForm";


const ProjectMemberPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProList<any>
      rowKey="id"
      actionRef={actionRef}
      request={(params => {
        return getProjectMemberList({projectKey, ...params})
      })}
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
                <Tag color={ProjectRoles[row.projectRole]?.color}>{ProjectRoles[row.projectRole]?.text}</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row) => [
            <ConfirmButton
              label="移除" hint="确定从项目中移除成员？移除后成员对该项目不具备权限" size="small" type="link" tip="仅从研发中心移除，会影响研发相关账号"
              icon={<DeleteOutlined/>}
              onConfirm={async e => {
                const res = await deleteProjectMember(row.id)
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
          <ProjectMemberForm projectKey={projectKey}/>
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default ProjectMemberPage


