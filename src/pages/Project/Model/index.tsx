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
import React, {useEffect, useRef, useState} from 'react';
import {Link, useMatch} from "@@/exports";
import {Button, Col, Divider, Input, InputRef, Row, Tag} from "antd";
import {OperateEditable, OperateTypes} from "@/services/project/constant";
import {ArrowLeftOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {
  getProjectDomainSelect,
  getProjectModelDetails,
  getProjectModelSelect,
  saveProjectModel,
} from "@/services/project/api";
import {
  BaseFields,
  BaseGenerics,
  BaseSuperClass,
  ModelTypes,
  TypeToSuperClassMap
} from "@/services/project/serviceModel";

const ProjectServiceDetails: React.FC = () => {
// @ts-ignore
  const {params: {type, operate, projectKey, uuid}} = useMatch('/project/model/:projectKey/:type/:operate/:uuid')
  const upperCaseType = type.toUpperCase()
  const upperCaseOperate = operate.toUpperCase()
  const editable: boolean = OperateEditable.includes(upperCaseOperate)
  const [fields, setFields] = useState<string[]>(BaseFields);
  const [superClassOptions, setSuperClassOptions] = useState<string[]>(BaseSuperClass);
  const [domianName, setDomianName] = useState('');
  const [domainItems, setDomainItems] = useState<string[]>([]);
  const inputDomianRef = useRef<InputRef>(null);

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

  const onDomainNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDomianName(event.target.value);
  };

  const addDomainItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setDomainItems([...domainItems, domianName]);
    setDomianName('');
    setTimeout(() => {
      inputDomianRef.current?.focus();
    }, 0);
  };
  useEffect(() => {
    getProjectDomainSelect(projectKey, {uuid, type, operate: upperCaseOperate}).then(res => {
      if (res.success && res.data) {
        setDomainItems(res.data)
      }
    })
    getProjectModelSelect(projectKey, {uuid, type, operate: upperCaseOperate}).then(res => {
      if (res.success && res.data) {
        setFields([...BaseFields, ...res.data])
        setSuperClassOptions([...BaseSuperClass, ...res.data])
      }
    })
  }, [])
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
                <Col span={11}>
                  <ProFormSelect
                    rules={[{required: true,},]}
                    tooltip="无需也不建议添加Service之类的作为后缀"
                    options={domainItems}
                    name="domain"
                    label="归属领域"
                    disabled={!editable}
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
                </Col>
                <Col span={11} offset={2}>
                  <ProFormSelect
                    initialValue={TypeToSuperClassMap[upperCaseType]}
                    rules={[{required: true,},]}
                    options={superClassOptions}
                    name="superClass"
                    label="父类"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11}>
                  <ProFormText name="name" label="中文名称" tooltip="模型的中文介绍" rules={[{required: true,},]}/>
                </Col>
                <Col span={11} offset={2}>
                  <ProFormText name="key" label={<>实体类名&nbsp;<ProFormDependency name={['key']}>
                    {({key}) => {
                      return (
                        key ? <Tag color="#108ee9">{key + ModelTypes[upperCaseType].name}</Tag> : ''
                      );
                    }}
                  </ProFormDependency></>} disabled={!editable} tooltip="Java实体类名,需要符合Java命名规范,会自动添加后缀"
                               rules={[{required: true,},]}/>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <ProFormTextArea
                    name="description"
                    label="模型介绍"
                    placeholder="请输入介绍"
                    rules={[{required: true,},]}
                  />
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
                  <ProFormText name="fieldName" label="字段名称" width="xs" rules={[{required: true,},]}/>
                  <ProFormText name="explain" label="字段说明" width="xs" rules={[{required: true,},]}/>
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


