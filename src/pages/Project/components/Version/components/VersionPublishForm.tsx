import {PlusSquareOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Form} from 'antd';


import {useEffect, useState} from 'react';
import {getProjectWarehouseSelect, publishProjectVersion} from "@/services/deployment/api";
import {MavenEnvironmentOptions, VersionCmd} from "@/services/deployment/version";
import {WarehouseTypes} from "@/services/deployment/warehouse";


type Props = {
  operate: string;
  projectKey: string;
  versionId?: number;
  version?: string;
  sourceId?: string;
};

export default (props: Props) => {
  const [form] = Form.useForm<VersionCmd>();
  const [environments, setEnvironments] = useState<any>(MavenEnvironmentOptions);
  const [environment, setEnvironment] = useState<any>('SNAPSHOT');
  const [warehouseId, setWarehouseId] = useState<string>();
  const [warehouseSelect, setWarehouseSelect] = useState<{ label: string; value: string; }[]>();

  useEffect(() => {
    //业务预留
    setEnvironments(MavenEnvironmentOptions)
    setEnvironment('SNAPSHOT')
    getProjectWarehouseSelect(props.projectKey, {}).then(res => {
      if (res.success && res.data) {
        const arr: { label: string; value: string; }[] = []
        res.data.forEach(item => {
          arr.push({
            label: `${item.name}(${WarehouseTypes[item.purposeType]?.text})`,
            value: item.uuid
          })
        })
        if (props.sourceId === undefined) {
          setWarehouseId(res.data[0].uuid)
        } else {
          setWarehouseId(props.sourceId)
        }

        setWarehouseSelect(arr)
      }
    })
  }, [])
  return (
    <ModalForm<VersionCmd>
      title={'发布版本'}
      trigger={
        props.versionId === undefined ? <Button type="primary">
          <PlusSquareOutlined/>
          发布版本
        </Button> : <Button type="link">
          发布
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
        values.projectKey = props.projectKey
        values.versionId = props.versionId
        const split: string[] | undefined = values.version?.split(".");
        if (split) {
          const versionNum = parseInt(split[0]) * 10000 + parseInt(split[0]) * 100 + parseInt(split[0])
          values.version = versionNum + ''
        } else {
          values.version = "10000"
        }

        const res = await publishProjectVersion(values);
        return res.success;
      }}
    >
      <ProFormGroup>
        <ProFormSelect
          disabled={props.operate === 'edit'}
          name="warehouseId"
          initialValue={warehouseId}
          label="发布的系统"
          placeholder="选择需要发布的系统"
          options={warehouseSelect}
          rules={[{required: true, message: '选择需要发布的系统!'}]}
        />
        <ProFormText
          disabled={props.operate === 'edit'}
          width="sm"
          name="version"
          initialValue={props.version}
          label="版本号"
          tooltip="发布项目的版本"
          placeholder="请输入系统发布的版本号"
          rules={[{required: true, pattern: /^[1-9]\d?(\.([1-9]?\d)){2}$/, message: '请输入系统发布的版本号!'}]}
        />
        <ProFormRadio.Group
          name="environment"
          label="发布环境"
          radioType="button"
          tooltip="发布的环境"
          initialValue={environment}
          fieldProps={{
            buttonStyle: "solid",
          }}
          options={environments}
        />
      </ProFormGroup>
      <ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="commitMessage"
          label="发布信息"
          tooltip="最长为 100 字符"
          placeholder="请输入描述"
          rules={[{required: true, max: 100, message: '请输入描述!(最长为 100 字符)'}]}
        />
      </ProForm.Group>

    </ModalForm>
  );
};
