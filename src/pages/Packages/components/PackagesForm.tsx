import {PlusSquareOutlined} from '@ant-design/icons';
import {ModalForm, ProFormText,} from '@ant-design/pro-components';
import {Button, Form} from 'antd';


import {useEffect} from 'react';
import {success} from "@/common/messages";
import {PackagesCmd} from "@/services/deployment/packages";
import {savePackagesList} from "@/services/deployment/api";

type Props = {
  onFinish?: (data: PackagesCmd) => void
};

export default (props: Props) => {
  const [form] = Form.useForm<PackagesCmd>();
  useEffect(() => {

  }, [])
  return (
    <ModalForm<PackagesCmd>
      title={"登记制品"}
      trigger={
        <Button type="primary">
          <PlusSquareOutlined/>
          登记制品
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
        const res = await savePackagesList(values)
        if (props.onFinish) {
          props.onFinish(values)
        }
        return success(res);
      }}
    >
      <ProFormText name="name" label="制品解释" placeholder="请输入中文解释" rules={[{required: true, message: '请输入中文解释!'}]}/>
      <ProFormText name="groupId" label="制品组" placeholder="请输入制品组" rules={[{required: true, message: '请输入制品组!'}]}/>
      <ProFormText name="artifactId" label="制品名称" placeholder="请输入制品名称"
                   rules={[{required: true, message: '请输入制品名称!'}]}/>
      <ProFormText name="version" label="版本号" placeholder="请输入版本号" rules={[{required: true, message: '请输入版本号!'}]}/>
    </ModalForm>
  );
};
