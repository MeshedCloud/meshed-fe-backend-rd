import {PlusSquareOutlined} from '@ant-design/icons';
import {
  CheckCard,
  ModalForm,
  ProForm,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Form} from 'antd';


import {useEffect, useState} from 'react';
import {
  ClientEngineTypes,
  ConsoleEngineTypes,
  PurposeTypeOptions,
  ServiceEngineTypes,
  WarehouseCmd,
  WarehouseOperateOptions
} from "@/services/deployment/warehouse";
import {saveProjectWarehouse} from "@/services/deployment/api";


type Props = {
  projectKey: string;
};

export default (props: Props) => {
  const [form] = Form.useForm<WarehouseCmd>();
  const [engineTypes, setEngineTypes] = useState<any>(ServiceEngineTypes);
  const [operate, setOperate] = useState<string>('NEW');

  useEffect(() => {

  }, [])
  return (
    <ModalForm<WarehouseCmd>
      title={'新增仓库'}
      trigger={
        <Button type="primary">
          <PlusSquareOutlined/>
          新增仓库
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
        const res = await saveProjectWarehouse(values);
        return res.success;
      }}
    >
      <ProFormGroup>
        <ProFormRadio.Group
          width="md"
          name="purposeType"
          label="仓库作用"
          radioType="button"
          tooltip="仓库在系统的起到的角色范围"
          initialValue={'SERVICE'}
          fieldProps={{
            buttonStyle: "solid",
            onChange: ({target: {value}}) => {
              setEngineTypes({})
              if (value === 'SERVICE') {
                setEngineTypes(ServiceEngineTypes)
              } else if (value === 'CLIENT') {
                setEngineTypes(ClientEngineTypes)
              } else if (value === 'CONSOLE') {
                setEngineTypes(ConsoleEngineTypes)
              }
            }
          }}
          options={PurposeTypeOptions}
        />
        <ProFormRadio.Group
          width="md"
          name="operate"
          label="新增/导入"
          radioType="button"
          tooltip="新建研发系统或导入已有的仓库"
          initialValue={'NEW'}
          fieldProps={{
            buttonStyle: "solid",
            onChange: ({target: {value}}) => {
              setOperate(value)
            }
          }}
          options={WarehouseOperateOptions}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          width="md"
          name="name"
          label="仓库中文名称"
          tooltip="最长为 20 位"
          placeholder="请输入仓库中文名称"
          rules={[{required: true, max: 20, message: '请输入仓库中文名称!'}]}
        />

        <ProFormText
          width="md"
          name="repoName"
          label="仓库存储名称"
          tooltip="最长为 24 位"
          placeholder="请输入仓库存储名称"
          rules={[{required: true, message: '请输入仓库存储名称!'}]}
        />
      </ProFormGroup>
      {
        operate === 'NEW' ? <></> :
          <ProFormGroup>
            <ProFormText
              width="md"
              name="repoUrl"
              label="仓库地址"
              tooltip="导入仓库必须传递的外部仓库HTTP地址"
              placeholder="请输入仓库地址"
              rules={[{required: true, message: '请输入仓库地址!'}]}
            />

            <ProFormText
              width="md"
              name="accessToken"
              label="源仓库的授权码"
              tooltip="公开库和平台已又权限可不填"
              placeholder="请输入服务分组标识"
            />
          </ProFormGroup>
      }

      {
        Object.keys(engineTypes).length > 0 ? <ProFormGroup>
          <ProForm.Item name='engineTemplate' label="模板(非必选)">
            <CheckCard.Group
              onChange={(checkedValue) => {
                console.log("checkedValue", checkedValue)

              }}
            >
              {
                Object.keys(engineTypes).map(type => {
                  return <CheckCard
                    key={type}
                    avatar={engineTypes[type].avatar}
                    title={engineTypes[type].text}
                    description={engineTypes[type].description}
                    value={engineTypes[type].key}
                  />
                })
              }
            </CheckCard.Group>
          </ProForm.Item>
        </ProFormGroup> : <></>
      }

      <ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="description"
          label="描述"
          tooltip="最长为 100 字符"
          placeholder="请输入描述"
          rules={[{required: true, max: 100, message: '请输入描述!(最长为 100 字符)'}]}
        />
      </ProForm.Group>

    </ModalForm>
  );
};
