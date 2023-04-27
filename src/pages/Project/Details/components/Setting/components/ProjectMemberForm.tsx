import {PlusSquareOutlined} from '@ant-design/icons';
import {ModalForm, ProFormSelect, ProList,} from '@ant-design/pro-components';
import {Button, Form, Space} from 'antd';


import {ReactText, useEffect, useState} from 'react';
import {Member, ProjectMemberCmd, ProjectRoleEnum} from "@/services/project/member";
import {getMemberList, saveProjectMember} from "@/services/project/api";
import {errorTips, success} from "@/common/messages";

type Props = {
  projectKey: string
};

export default (props: Props) => {
  const [form] = Form.useForm<ProjectMemberCmd>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  useEffect(() => {

  }, [])
  return (
    <ModalForm<ProjectMemberCmd>
      title={"添加成员"}
      trigger={
        <Button type="primary">
          <PlusSquareOutlined/>
          添加成员
        </Button>
      }
      initialValues={{}}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        if (selectedRowKeys.length < 1) {
          errorTips("请选择添加的成员")
          return false;
        }
        const ids: string[] = []
        for (let i = 0; i < selectedRowKeys.length; i++) {
          ids.push(String(selectedRowKeys[i]))
        }
        const res = await saveProjectMember({
          projectKey: props.projectKey,
          memberIds: ids,
          projectRole: values.projectRole
        });
        return success(res);
      }}
    >
      <ProList<Member>
        metas={{
          title: {
            dataIndex: 'name'
          },
          // description: {
          //   dataIndex: 'loginId'
          // },
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
          actions: {},
        }}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: ReactText[]) => {
            console.log(keys)
            setSelectedRowKeys(keys)
          },
        }}
        tableAlertRender={false}
        request={getMemberList}
      />
      <ProFormSelect
        name="projectRole"
        label="项目角色"
        tooltip="项目角色概念，非账号中心角色概念"
        initialValue={"VISITOR"}
        valueEnum={ProjectRoleEnum}
        placeholder="请选择角色"
        rules={[{required: true, message: '请选择角色'}]}
      />

    </ModalForm>
  );
};
