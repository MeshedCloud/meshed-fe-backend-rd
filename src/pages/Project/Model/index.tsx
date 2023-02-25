import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Link, useMatch} from "@@/exports";
import {Button, Col, Row, Tag} from "antd";
import {OperateEditable, OperateTypes} from "@/services/project/constant";
import {ArrowLeftOutlined, EditOutlined} from "@ant-design/icons";
import {getProjectModelDetails, getProjectModelFieldSelect, saveProjectModel,} from "@/services/project/api";
import {BaseFields, BaseGenerics, ModelTypes} from "@/services/project/serviceModel";


const ProjectServiceDetails: React.FC = () => {
// @ts-ignore
  const {params: {type, operate, projectKey, uuid}} = useMatch('/project/:projectKey/model/:type/:operate/:uuid')
  const upperCaseType = type.toUpperCase()
  const upperCaseOperate = operate.toUpperCase()
  const editable: boolean = OperateEditable.includes(upperCaseOperate)
  const [fields, setFields] = useState<string[]>(BaseFields);
  const saveModel = async (data: any) => {
    if (upperCaseOperate !== 'COPY') {
      data.id = undefined
    }
    if (upperCaseOperate === 'EDIT') {
      data.uuid = uuid
    }
    data.type = upperCaseType
    data.operate = upperCaseOperate
    data.projectKey = projectKey
    await saveProjectModel(data)
  }
  useEffect(() => {

    getProjectModelFieldSelect(uuid, {}).then(res => {
      if (res.success && res.data) {
        setFields([...BaseFields, ...res.data])
      }
    })
  })
  return (
    <PageContainer fixedHeader
                   content={<Link to={`/project/details/model/${projectKey}`}><ArrowLeftOutlined/>返回模型列表</Link>}
                   extra={
                     OperateTypes[upperCaseOperate]?.readonly ? <Button type="link"><EditOutlined/>编辑副本</Button> : <></>
                   }
                   title={OperateTypes[upperCaseOperate]?.text + ModelTypes[upperCaseType]?.text + "服务"}>
      <ProCard style={{padding: 10}}>
        <ProForm
          request={async () => {
            if (upperCaseOperate === 'NEW') {
              return {}
            }
            const res = await getProjectModelDetails(uuid, {
              type: upperCaseType,
              operate: upperCaseOperate,
              projectKey: projectKey
            })
            if (res && res.success && res.data) {
              return res.data;
            }
            return {}
          }}
          readonly={OperateTypes[upperCaseOperate]?.readonly}
          submitter={{
            render: (_, dom) => OperateTypes[upperCaseOperate]?.readonly ? <></> : <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={saveModel}
        >

          <ProCard gutter={[16, 16]} split={"horizontal"}>
            <ProCard title="模型信息" bordered>
              <Row>
                <Col span={8}>
                  <Row>
                    <Col span={24}>
                      <ProFormText name="name" label="中文名称" tooltip="模型的中文介绍" rules={[{required: true,},]}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ProFormText name="enname" label={<>实体类名&nbsp;<ProFormDependency name={['enname']}>
                        {({enname}) => {
                          return (
                            enname ? <Tag color="#108ee9">{enname + ModelTypes[upperCaseType].name}</Tag> : ''
                          );
                        }}
                      </ProFormDependency></>} disabled={!editable} tooltip="Java实体类名,需要符合Java命名规范,会自动添加后缀"
                                   rules={[{required: true,},]}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}/>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ProFormTextArea
                        name="describe"
                        label="模型介绍"
                        placeholder="请输入介绍"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ProCard>

            <ProCard title="模型参数" tooltip="符合Java开发字段规范" bordered>
              <ProFormList
                name="fields"
                initialValue={[{}]}
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
                    initialValue={'NONE'}
                    rules={[{required: true,},]}
                    options={BaseGenerics}
                    width="xs"
                    name="generic"
                    label="泛型"
                  />
                  {
                    upperCaseType === 'DTO' ? <></> : <><ProFormSwitch name="nonNull" label="是否非空"/>
                      <ProFormText name="mock" label="模拟数据"/>
                      <ProFormText name="rule" tooltip='规则必须为json格式：{"max":100,"min":30} -  更多查看文档' label="规则"/></>
                  }
                </ProFormGroup>
              </ProFormList>
            </ProCard>
          </ProCard>


        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ProjectServiceDetails


