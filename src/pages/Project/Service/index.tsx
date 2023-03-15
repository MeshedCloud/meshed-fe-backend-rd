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
import {Button, Col, Row} from "antd";
import {ArrowLeftOutlined, EditOutlined} from "@ant-design/icons";
import {strToUri} from "@/common/uri";
import {getProjectModelSelect, getProjectServiceDetails, saveProjectService} from "@/services/project/api";
import type {ProjectServiceDetails} from "@/services/project/serviceModel";
import {
  BaseFields,
  BaseGenerics,
  PathVariableItem,
  RequestBodyItem,
  RequestModeOptions,
  RequestTypeOptions,
  ServiceTypes
} from "@/services/project/serviceModel"
import {OperateEditable, OperateTypes} from "@/services/project/constant";

const ProjectServiceDetailsPage: React.FC = () => {
// @ts-ignore
  const {
    params: {
      projectKey,
      operate,
      groupId,
      uuid
    }
  } = useMatch('/project/service/:projectKey/:operate/:groupId/:uuid')
  // const upperCaseType = type.toUpperCase()
  const upperCaseOperate = operate.toUpperCase()
  const editable: boolean = OperateEditable.includes(upperCaseOperate)
  const [uriDisabled, setUriDisabled] = useState<boolean>(true)
  const [fields, setFields] = useState<string[]>(BaseFields);
  const formRef = useRef<ProFormInstance<ProjectServiceDetails>>();
  const [uriPrefix, setUriPrefix] = useState('');
  const paramActionRef = useRef<FormListActionType<{
    fieldName: string,
    fieldType: string,
    generic: string,
  }>>();


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
    data.operate = upperCaseOperate
    data.groupId = groupId
    await saveProjectService(data)
  }

  useEffect(() => {
    getProjectModelSelect(uuid, {}).then(res => {
      if (res.success && res.data) {
        setFields([...BaseFields, ...res.data])
      }
    })
  }, [])
  return (
    <PageContainer fixedHeader
                   content={<Link to={`/project/details/service/${projectKey}`}><ArrowLeftOutlined/>返回服务列表</Link>}
                   title={OperateTypes[upperCaseOperate]?.text + ServiceTypes['API']?.text + "服务"}>
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
              // type: upperCaseType,
              operate: upperCaseOperate,
              projectKey: projectKey
            })
            if (res && res.success && res.data) {
              setUriPrefix(strToUri(res.data?.control))
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
                      <ProFormText name="method" label="调用的方法名称" disabled={!editable} tooltip="需要符合Java命名规范"
                                   fieldProps={{
                                     onBlur: () => {
                                       const method = formRef.current?.getFieldValue('method')
                                       formRef.current?.setFieldValue('uri', strToUri(method))
                                     }
                                   }}
                                   rules={[{required: true,},]}/>
                    </Col>
                  </Row>
                  <Row hidden={!("API" === ServiceTypes.API.key)}>
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
                  {
                    "API" === ServiceTypes.RPC.key ? <></> : <Row>
                      <Col span={10}>
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
                      <Col span={7} offset={1}>
                        <ProFormText name="identifier" disabled={!editable} label="标识符"
                                     tooltip="授权码结构：${项目}:${领域}:${标识符} (此处仅填写标识符)"
                                     rules={[{required: true,},]}/>
                      </Col>
                    </Row>
                  }

                  <Row>
                    <Col span={20}>
                      <ProFormTextArea
                        width="xl"
                        name="description"
                        label="接口介绍"
                        placeholder="请输入介绍"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ProCard>

            <ProCard title="请求参数" tooltip="接收请求参数的数据，除路径，特殊参数外，多个参数会被合并成一个单独的对象"
                     extra={
                       <ProFormRadio.Group
                         name="requestMode"
                         initialValue="FORM"
                         radioType="button"
                         fieldProps={{buttonStyle: "solid"}}
                         options={RequestModeOptions}
                       />
                     }
                     bordered onBlur={pathHandler}>
              <ProFormList
                name="requests"
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
                    options={[...BaseGenerics, PathVariableItem, RequestBodyItem]}
                    width="xs"
                    name="generic"
                    tooltip='其中路径参数需要是JAVA基本数据类型，非基本类型不生效'
                    label="泛型/特殊"
                    fieldProps={{
                      onChange: (value) => {
                        console.log(value)

                      }
                    }}
                  />
                  <ProFormSwitch name="nonNull" label="非空"/>
                  <ProFormText name="rule" tooltip='规则必须为json格式：{"max":100,"min":30} -  更多查看文档' label="规则"/>

                </ProFormGroup>
              </ProFormList>
            </ProCard>

            <ProCard title="响应数据" tooltip="所有参数会合并成一个对象包装返回，建议先建立模型" bordered
                     extra={
                       <ProFormSwitch name="responseMode" fieldProps={{
                         checkedChildren: "合并",
                         unCheckedChildren: "单参"
                       }}/>
                     }
            >
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


