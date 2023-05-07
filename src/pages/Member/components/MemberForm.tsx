import {PlusSquareOutlined} from '@ant-design/icons';
import {ModalForm, ProList,} from '@ant-design/pro-components';
import {Button, Form, Space} from 'antd';


import {ReactText, useEffect, useState} from 'react';
import {Member, MemberCmd} from "@/services/project/member";
import {getImportMemberList, saveMember} from "@/services/project/api";
import {errorTips, success} from "@/common/messages";

type Props = {
  onFinish?: () => void
};

export default (props: Props) => {
  const [form] = Form.useForm<MemberCmd>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  useEffect(() => {

  }, [])
  return (
    <ModalForm<MemberCmd>
      title={"从账号中心导入成员"}
      trigger={
        <Button type="primary">
          <PlusSquareOutlined/>
          导入成员
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
          errorTips("请选择添加的账号")
          return false;
        }
        const ids: string[] = []
        for (let i = 0; i < selectedRowKeys.length; i++) {
          ids.push(String(selectedRowKeys[i]))
        }
        const res = await saveMember({
          userIds: ids
        });

        if (res.success && props.onFinish) {
          props.onFinish()
        }
        return success(res);
      }}
    >
      <ProList<Member>
        metas={{
          title: {
            dataIndex: 'realName'
          },
          description: {
            dataIndex: 'loginId'
          },
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
        rowKey="uid"
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          selectedRowKeys,
          getCheckboxProps: record => ({
            disabled: record.disabled,    // 配置无法勾选的列
          }),
          onChange: (keys: ReactText[]) => {
            setSelectedRowKeys(keys)
            console.log(keys)
          },
        }}
        tableAlertRender={false}
        request={getImportMemberList}
      />

    </ModalForm>
  );
};
