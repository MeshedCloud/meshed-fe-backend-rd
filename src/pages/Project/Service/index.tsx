import type {FormListActionType, ProFormInstance} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {Link, useMatch} from "@@/exports";
import type {InputRef} from "antd";
import {Button, Col, Divider, Input, Row} from "antd";
import {ArrowLeftOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {strToUri} from "@/common/uri";
import {
  getProjectModelFieldSelect,
  getProjectServiceDetails,
  getProjectServiceDomainSelect,
  saveProjectService
} from "@/services/project/api";
import type {ProjectServiceDetails} from "@/services/project/serviceModel";
import {
  BaseFields,
  BaseGenerics,
  PathVariableItem,
  RequestTypeOptions,
  ServiceBehaviorOptions,
  ServiceTypes
} from "@/services/project/serviceModel"
import {OperateEditable, OperateTypes} from "@/services/project/constant";

const ProjectServiceDetailsPage: React.FC = () => {
// @ts-ignore
  const {params: {type, operate, key, uuid}} = useMatch('/project/:key/service/:type/:operate/:uuid')
  const upperCaseType = type.toUpperCase()
  const upperCaseOperate = operate.toUpperCase()
  const editable: boolean = OperateEditable.includes(upperCaseOperate)
  const [uriDisabled, setUriDisabled] = useState<boolean>(true)
  const [items, setItems] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>(BaseFields);
  const formRef = useRef<ProFormInstance<ProjectServiceDetails>>();
  const [uriPrefix, setUriPrefix] = useState('');
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const paramActionRef = useRef<FormListActionType<{
    fieldName: string,
    fieldType: string,
    generic: string,
  }>>();
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };


  const pathHandler = () => {
    const rows = paramActionRef.current?.getList();
    if (uriDisabled && rows && rows?.length > 0) {
      const pathVariable: string[] = []
      rows.forEach((row) => {
        if (row.generic === PathVariableItem.value && row.fieldName && BaseFields.includes(row.fieldType)) {
          pathVariable.push(`/{${row.fieldName}}`)
        }
      })
      if (pathVariable.length > 0) {
        const enname = formRef.current?.getFieldValue('enname')
        formRef.current?.setFieldValue('uri', strToUri(enname) + pathVariable?.join(''))
      }
    }

  }


  const saveService = async (data: any) => {
    if (upperCaseOperate !== 'COPY') {
      data.id = undefined
    }
    if (upperCaseOperate === 'EDIT') {
      data.uuid = uuid
    }
    data.type = upperCaseType
    data.operate = upperCaseOperate
    data.projectKey = key
    await saveProjectService(data)
  }

  useEffect(() => {
    getProjectServiceDomainSelect(uuid, {type}).then(res => {
      if (res.success && res.data) {
        setItems(res.data)
      }
    })
    getProjectModelFieldSelect(uuid, {}).then(res => {
      if (res.success && res.data) {
        setFields([...BaseFields, ...res.data])
      }
    })
  })
  return (
    <PageContainer fixedHeader content={<Link to={`/project/details/service/${key}`}><ArrowLeftOutlined/>返回服务列表</Link>}
                   title={OperateTypes[upperCaseOperate]?.text + ServiceTypes[upperCaseType]?.text + "服务"}>
      <ProCard style={{padding: 10}} extra={
        OperateTypes[upperCaseOperate]?.readonly ? <Button type="link"><EditOutlined/>编辑副本</Button> : <></>
      }>
        <ProForm
          formRef={formRef}
          request={async () => {
            if (upperCaseOperate === 'NEW') {
              return {}
            }
            const res = await getProjectServiceDetails(uuid, {
              type: upperCaseType,
              operate: upperCaseOperate,
              projectKey: key
            })
            if (res && res.success && res.data) {
              setUriPrefix(strToUri(res.data?.domain))
              return res.data;
            }

            return {}
          }}
          readonly={OperateTypes[upperCaseOperate]?.readonly}
          submitter={{
            render: (_, dom) => OperateTypes[upperCaseOperate]?.readonly ? <></> : <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={saveService}
        >

          <ProCard gutter={[16, 16]} split={"horizontal"}>
            <ProCard title="接口信息" bordered onBlur={pathHandler}>
              <Row>
                <Col span={8}>
                  <Row>
                    <Col span={24}>
                      <ProFormText name="name" label="接口中文名" tooltip="接口的中文介绍" rules={[{required: true,},]}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ProFormText name="enname" label="调用的方法名称" disabled={!editable} tooltip="需要符合Java命名规范"
                                   fieldProps={{
                                     onBlur: () => {
                                       const enname = formRef.current?.getFieldValue('enname')
                                       formRef.current?.setFieldValue('uri', strToUri(enname))
                                     }
                                   }}
                                   rules={[{required: true,},]}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ProFormSelect
                        rules={[{required: true,},]}
                        tooltip="无需也不建议添加Service之类的作为后缀"
                        options={items}
                        name="domain"
                        label="归属领域"
                        disabled={!editable}
                        fieldProps={{
                          onChange: (domain) => {
                            setUriPrefix(strToUri(domain))
                          },
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
                                  ref={inputRef}
                                  value={name}
                                  onChange={onNameChange}
                                />
                                <Button type="text" icon={<PlusOutlined/>} onClick={addItem}>
                                  新增领域
                                </Button>
                              </div>
                            </>
                          )
                        }}
                      />
                    </Col>
                  </Row>
                  <Row hidden={!(upperCaseType === ServiceTypes.API.key)}>
                    <Col span={24}>
                      <ProFormText name="uri" label="请求路径" tooltip="uri正常会通过方法名称生成，如特殊需要请点编辑自行设置" disabled={uriDisabled}
                                   rules={[{required: true,},]}
                                   fieldProps={
                                     {
                                       addonAfter: <div onClick={() => {
                                         if (editable) {
                                           setUriDisabled(false)
                                         }
                                       }}>
                                         <EditOutlined/>
                                       </div>,
                                       addonBefore: <div>{uriPrefix}</div>
                                     }
                                   }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={14} offset={2}>
                  <Row>
                    {
                      upperCaseType === ServiceTypes.RPC.key ? <></> : <Col span={8}>
                        <ProFormRadio.Group
                          disabled={!editable}
                          label="请求类型"
                          name="requestType"
                          initialValue="GET"
                          radioType="button"
                          fieldProps={{buttonStyle: "solid"}}
                          options={RequestTypeOptions}
                        />
                      </Col>
                    }

                    <Col span={8}>
                      <ProFormRadio.Group
                        disabled={!editable}
                        label="接口行为"
                        tooltip="接口在系统中将会作为什么业务开发？这"
                        name="behavior"
                        initialValue="QRY"
                        radioType="button"
                        fieldProps={{buttonStyle: "solid"}}
                        options={ServiceBehaviorOptions}
                      />
                    </Col>
                  </Row>
                  {
                    upperCaseType === ServiceTypes.RPC.key ? <></> : <Row>
                      <Col span={16}>
                        <Col span={24}>
                          <ProFormText name="identifier" disabled={!editable} label="标识符"
                                       tooltip="授权码结构：${项目}:${领域}:${标识符} (此处仅填写标识符)"
                                       rules={[{required: true,},]}/>
                        </Col>
                      </Col>
                    </Row>
                  }

                  <Row>
                    <Col span={16}>
                      <ProFormTextArea
                        name="describe"
                        label="接口介绍"
                        placeholder="请输入介绍"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ProCard>

            {
              upperCaseType === ServiceTypes.RPC.key ? <></> :
                <ProCard title="请求参数" tooltip="接收请求参数的数据，除路径，特殊参数外，多个参数会被合并成一个单独的对象" bordered onBlur={pathHandler}>
                  <ProFormList
                    name="requestParams"
                    actionRef={paramActionRef}
                    initialValue={[]}
                    copyIconProps={OperateTypes[upperCaseOperate]?.readonly ? false : {
                      tooltipText: '复制此行到末尾',
                    }}
                    deleteIconProps={OperateTypes[upperCaseOperate]?.readonly ? false : {
                      tooltipText: '不需要这行了',
                    }}
                    creatorButtonProps={OperateTypes[upperCaseOperate]?.readonly ? false : {creatorButtonText: "新增字段"}}
                  >
                    <ProFormGroup key="group">
                      <ProFormText name="fieldName" label="字段名称" rules={[{required: true,},]}/>
                      <ProFormText name="explain" label="字段说明"/>
                      <ProFormSelect
                        rules={[{required: true,},]}
                        initialValue={'String'}
                        options={fields}
                        width="xs"
                        name="fieldType"
                        label="字段类型"
                      />
                      <ProFormSelect
                        rules={[{required: true,},]}
                        initialValue={'NONE'}
                        options={[...BaseGenerics, PathVariableItem,]}
                        width="xs"
                        name="generic"
                        tooltip='其中路径参数需要是JAVA基本数据类型，非基本类型不生效'
                        label="泛型/特定类型"
                        fieldProps={{
                          onChange: (value) => {
                            console.log(value)

                          }
                        }}
                      />
                      <ProFormSwitch name="nonNull" label="非空"/>
                      <ProFormText name="mock" label="模拟数据"/>
                      <ProFormText name="rule" tooltip='规则必须为json格式：{"max":100,"min":30} -  更多查看文档' label="规则"/>

                    </ProFormGroup>
                  </ProFormList>
                </ProCard>
            }

            <ProCard title={upperCaseType === ServiceTypes.RPC.key ? "请求参数" : "请求体(JSON)"}
                     tooltip="接收请求体的数据，除路径，特殊参数外，多个参数会被合并成一个单独的对象" bordered>
              <ProFormList
                name="requestBodys"
                initialValue={[]}
                copyIconProps={OperateTypes[upperCaseOperate]?.readonly ? false : {
                  tooltipText: '复制此行到末尾',
                }}
                deleteIconProps={OperateTypes[upperCaseOperate]?.readonly ? false : {
                  tooltipText: '不需要这行了',
                }}
                creatorButtonProps={OperateTypes[upperCaseOperate]?.readonly ? false : {creatorButtonText: "新增字段"}}
              >
                <ProFormGroup key="group">
                  <ProFormText name="fieldName" label="字段名称" rules={[{required: true,},]}/>
                  <ProFormText name="explain" label="字段说明"/>
                  <ProFormSelect
                    rules={[{required: true,},]}
                    initialValue={'String'}
                    options={fields}
                    width="xs"
                    name="fieldType"
                    label="字段类型"
                  />
                  <ProFormSelect
                    rules={[{required: true,},]}
                    initialValue={'NONE'}
                    options={BaseGenerics}
                    width="xs"
                    name="generic"
                    label="泛型"
                  />
                  <ProFormSwitch name="nonNull" label="是否非空"/>
                  <ProFormText name="mock" label="模拟数据"/>
                  <ProFormText name="rule" tooltip='规则必须为json格式：{"max":100,"min":30} -  更多查看文档' label="规则"/>

                </ProFormGroup>
              </ProFormList>
            </ProCard>
            <ProCard title="答复数据" tooltip="所有参数会合并成一个对象包装返回，建议先建立模型" bordered>
              <ProFormList
                name="responses"
                initialValue={[]}
                copyIconProps={OperateTypes[upperCaseOperate]?.readonly ? false : {
                  tooltipText: '复制此行到末尾',
                }}
                deleteIconProps={OperateTypes[upperCaseOperate]?.readonly ? false : {
                  tooltipText: '不需要这行了',
                }}
                creatorButtonProps={OperateTypes[upperCaseOperate]?.readonly ? false : {creatorButtonText: "新增字段"}}
              >
                <ProFormGroup key="group">
                  <ProFormText name="fieldName" label="字段名称" rules={[{required: true,},]}/>
                  <ProFormText name="explain" label="字段说明"/>
                  <ProFormSelect
                    initialValue={'String'}
                    rules={[{required: true,},]}
                    options={fields}
                    width="xs"
                    name="fieldType"
                    label="字段类型"
                  />
                  <ProFormSelect
                    rules={[{required: true,},]}
                    initialValue={'NONE'}
                    options={BaseGenerics}
                    width="xs"
                    name="generic"
                    label="泛型"
                  />
                  <ProFormText name="mock" label="模拟数据"/>

                </ProFormGroup>
              </ProFormList>
            </ProCard>
          </ProCard>


        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ProjectServiceDetailsPage


