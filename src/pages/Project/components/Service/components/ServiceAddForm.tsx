import {PlusOutlined} from '@ant-design/icons';
import {
  CheckCard,
  ModalForm,
  ProForm,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Divider, Form, Input, InputRef} from 'antd';


import {ProjectServiceGroup, ServiceTypes} from "@/services/project/serviceModel";
import React, {useEffect, useRef, useState} from 'react';
import {getProjectDomainSelect, getProjectServiceGroupSelect, saveProjectServiceGroup} from "@/services/project/api";
import {history} from "@@/core/history";

const newItem = {
  value: 'NEW',
  label: '新建分组',
}

type Props = {
  projectKey: string;
  operate: string;
  uuid: string;
};

export default (props: Props) => {
  const [form] = Form.useForm<ProjectServiceGroup>();
  //分组
  const [groupApiItems, setGroupApiItems] = useState<any[]>([]);
  const [groupRpcItems, setGroupRpcItems] = useState<any[]>([]);
  const [groupItems, setGroupItems] = useState<any[]>([newItem]);
  const [groupId, setGroupId] = useState('NEW');
  //领域
  const [domainItems, setDomainItems] = useState<string[]>([]);
  const [domianName, setDomianName] = useState('');
  const inputDomianRef = useRef<InputRef>(null);


  const onDomainNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != '') {
      setDomianName(event.target.value);
    }

  };

  const addDomainItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (domianName != '') {
      setDomainItems([...domainItems, domianName]);
      setDomianName('');
      setTimeout(() => {
        inputDomianRef.current?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    getProjectDomainSelect(props.projectKey, {}).then(res => {
      if (res.success && res.data) {
        setDomainItems(res.data)
      }
    })
    getProjectServiceGroupSelect(props.projectKey, {}).then(res => {
      if (res.success && res.data && res.data.length > 0) {
        const apis: { label: string; value: string }[] = [newItem]
        const rpcList: { label: string; value: string }[] = [newItem]
        res.data.forEach(item => {
          if (item.type === "RPC") {
            rpcList.push({
              label: `${item.name}(${item.className})`,
              value: item.uuid
            })
          } else if (item.type === 'API') {
            apis.push({
              label: `${item.name}(${item.className})`,
              value: item.uuid
            })
          }
        })
        setGroupApiItems(apis)
        setGroupRpcItems(rpcList)
        setGroupItems(apis)
      }
    })
  }, [])
  return (
    <ModalForm<ProjectServiceGroup>
      title={'新建接口'}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          新建接口
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

        console.log(values)
        //如果是新建=》 新建分组 =》 跳转
        if (values.groupId == 'NEW') {
          values.projectKey = props.projectKey
          saveProjectServiceGroup(values).then(res => {
            if (res.success && res.data) {
              history.push({
                pathname: `/project/service/${props.projectKey}/${props.operate}/${res.data.uuid}/${props.uuid}`
              })
            }
          })
        } else {
          history.push({
            pathname: `/project/service/${props.projectKey}/${props.operate}/${values.groupId}/${props.uuid}`
          })
        }
        return true;
      }}
    >
      <ProFormGroup>
        <ProForm.Item name='type' initialValue={"API"} rules={[{required: true, message: "此项必须选择"}]}>
          <CheckCard.Group
            onChange={(checkedValue) => {
              console.log("checkedValue", checkedValue)
              if (checkedValue === 'API') {
                setGroupItems(groupApiItems);
              } else if (checkedValue === 'RPC') {
                setGroupItems(groupRpcItems);
              }
            }}
            defaultValue={"API"}
          >
            {
              Object.keys(ServiceTypes).map(type => {
                return <CheckCard
                  key={type}
                  avatar={ServiceTypes[type].avatar}
                  title={ServiceTypes[type].text}
                  description={ServiceTypes[type].description}
                  value={type}
                />
              })
            }
          </CheckCard.Group>
        </ProForm.Item>
      </ProFormGroup>
      <ProFormGroup>
        <ProFormSelect
          rules={[{required: true,},]}
          initialValue={'NEW'}
          options={
            groupItems
          }
          width="xl"
          name="groupId"
          tooltip='服务分组是映射研发的实体Rest控制器/RPC接口'
          label="所属服务分组"
          fieldProps={{
            onChange: (value) => {
              console.log(value)
              setGroupId(value)

            }
          }}
        />
      </ProFormGroup>
      {
        groupId === 'NEW' ? <>
          <ProFormGroup>
            <ProFormSelect
              rules={[{required: true,},]}
              tooltip="系统内部对于业务的领域划分的构建概念"
              options={domainItems}
              name="domain"
              label="归属领域"
              width="xl"
              fieldProps={{
                dropdownRender: (menu) => (
                  <>
                    {menu}
                    <Divider style={
                      {margin: '8px 0'}
                    }/>
                    <div style={
                      {padding: '0 8px 4px', display: 'flex',}
                    }>
                      <Input
                        placeholder="新建领域"
                        ref={inputDomianRef}
                        value={domianName}
                        onChange={onDomainNameChange}
                      />
                      <Button type="text" icon={<PlusOutlined/>} onClick={addDomainItem}>
                        新增领域
                      </Button>
                    </div>
                  </>
                )
              }}
            />
          </ProFormGroup>

          <ProFormText
            width="xl"
            name="name"
            label="分组名称"
            tooltip="最长为 20 位"
            placeholder="请输入分组名称"
            rules={[{required: true, max: 20, message: '请输入分组名称!'}]}
          />

          <ProFormText
            width="xl"
            name="key"
            label="服务分组标识"
            tooltip="最长为 24 位"
            placeholder="请输入服务分组标识"
            rules={[{required: true, message: '请输入服务分组标识!'}]}
          />
          <ProFormText
            width="xl"
            name="uri"
            label="服务URI前缀"
            tooltip="最长为 24 位"
            placeholder="将作为服务的前缀路径"
            rules={[{required: true, message: '请输入服务URI前缀!'}]}
          />
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
        </> : <></>
      }


    </ModalForm>
  );
};
