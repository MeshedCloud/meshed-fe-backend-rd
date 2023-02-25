import type {ProFormInstance} from '@ant-design/pro-components';
import {
  CheckCard,
  PageContainer,
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormGroup,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  StepsForm
} from '@ant-design/pro-components';
import {message} from 'antd';
import React, {useRef, useState} from 'react';
import type {ProjectCmd} from "@/services/project/project";
import {
  PageTemplateEnum,
  ProjectAccessModeEnum,
  ProjectAccessModeOptions,
  ProjectTypesEnum,
  ServiceTemplateEnum
} from "@/services/project/project";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


const CreateProject: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [type, setType] = useState<string>('SERVICE')
  const [model, setModel] = useState<any>({})
  const [result, setResult] = useState<any>({})

  return (
    <PageContainer>
      <ProCard style={{padding: 100}}>
        <StepsForm<ProjectCmd>
          formRef={formRef}
          onFinish={async (values) => {
            await waitTime(1000);
            console.log("values ", values);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
        >
          <StepsForm.StepForm<ProjectCmd>
            name="projectType"
            title="项目选型"
            stepProps={{
              description: '项目主要能力选择',
            }}
            onFinish={async (value) => {
              setModel(value)
              return true;
            }}
          >
            <ProFormGroup title="项目类型">
              <ProForm.Item name='type' initialValue={'SERVICE'} rules={[{required: true,},]}>
                <CheckCard.Group
                  onChange={(value) => {
                    const typeValue = value + '';
                    formRef.current?.setFieldValue('type', typeValue)
                    setType(typeValue)
                  }}
                  defaultValue="SERVICE"
                >
                  {
                    Object.keys(ProjectTypesEnum).map(key => {
                      return <CheckCard
                        key={key}
                        avatar={ProjectTypesEnum[key].avatar}
                        title={ProjectTypesEnum[key].text}
                        description={ProjectTypesEnum[key].description}
                        value={key}
                      />
                    })
                  }
                </CheckCard.Group>
              </ProForm.Item>

            </ProFormGroup>
            {
              type === 'SERVICE' ? <ProFormGroup title="前端模板">
                  <ProForm.Item name='pageTemplate' initialValue={'ANT_DESIGN_PRO'} rules={[{required: true,},]}>
                    <CheckCard.Group
                      onChange={() => {
                      }}
                      defaultValue="ANT_DESIGN_PRO"
                    >
                      {
                        Object.keys(PageTemplateEnum).map(key => {
                          return <CheckCard
                            key={key}
                            avatar={PageTemplateEnum[key].avatar}
                            title={PageTemplateEnum[key].text}
                            description={PageTemplateEnum[key].description}
                            value={key}
                          />
                        })
                      }

                    </CheckCard.Group>
                  </ProForm.Item>
                </ProFormGroup>
                : <></>
            }
            {
              type === 'SERVICE' ? <ProFormGroup title="后端模板">
                <ProForm.Item name='serviceTemplate' initialValue={'COLA'} rules={[{required: true,}]}>
                  <CheckCard.Group
                    onChange={() => {
                    }}
                    defaultValue="COLA"
                  >
                    {
                      Object.keys(ServiceTemplateEnum).map(key => {
                        return <CheckCard
                          avatar={ServiceTemplateEnum[key].avatar}
                          title={ServiceTemplateEnum[key].text}
                          description={ServiceTemplateEnum[key].description}
                          value={key}
                        />
                      })
                    }
                  </CheckCard.Group>
                </ProForm.Item>
              </ProFormGroup> : <></>
            }
          </StepsForm.StepForm>
          <StepsForm.StepForm<ProjectCmd>
            name="projectInfo"
            title="项目信息"
            stepProps={{
              description: '基本信息',
            }}
            onFinish={async (value) => {
              const target = {}; //目标对象
              Object.assign(target, model, value);
              setResult(target);
              return true;
            }}
          >
            <ProFormRadio.Group
              name="accessMode"
              label="项目级别"
              radioType="button"
              tooltip="正常作为非成员可见仅限查看API接口，对代码进行加密，内部开源对代码不进行成员限制，核心等级对非成员不可见"
              initialValue={'NORMAL'}
              fieldProps={{buttonStyle: "solid"}}
              options={ProjectAccessModeOptions}
            />
            <ProFormText name="name" label="名称" placeholder="请输入名称" rules={[{required: true,},]}/>
            <ProFormText name="enname" label="代号" tooltip="代号指代项目英文简写" placeholder="请输入代号"
                         rules={[{required: true,},]}/>

            <ProForm.Group title="数据源">
              <ProFormSwitch name="needMysql" label="MySql数据库" initialValue={true}/>
              <ProFormSwitch name="needRedis" label="Redis" initialValue={true}/>

            </ProForm.Group>
            <ProFormTextArea
              name="describe"
              label="立项缘由"
              placeholder="请输入立项缘由"
              rules={[{required: true,},]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm<ProjectCmd>
            name="submit"
            title="立项提交"
            stepProps={{
              description: '确认项目信息',
            }}
            onFinish={async (value) => {
              const target = {}; //目标对象
              Object.assign(target, model, value);
              setResult(target);
              return true;
            }}
          >
            <ProDescriptions style={{maxWidth: '800px'}} column={2} title="立项信息确认" tooltip="包含了从服务器请求，columns等功能">
              <ProDescriptions.Item label="项目名称" span={2} valueType="text">
                {result.name}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="项目类型" valueEnum={ProjectTypesEnum}>
                {result.type}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="项目级别" valueEnum={ProjectAccessModeEnum}>
                {result.accessMode}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="前端模板" valueEnum={PageTemplateEnum}>
                {result.pageTemplate}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="前端项目名称" valueType="text">
                meshed-fe-backend-{result.enname}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="后端模板" valueEnum={ServiceTemplateEnum}>
                {result.serviceTemplate}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="后端项目名称" valueType="text">
                meshed-cloud-{result.name} & meshed-cloud-{result.name}-client
              </ProDescriptions.Item>
              <ProDescriptions.Item label="立项缘由" span={2} valueType="text">
                {result.describe}
              </ProDescriptions.Item>
            </ProDescriptions>
            <ProFormCheckbox.Group
              name="checkbox"
              rules={[
                {
                  required: true,
                },
              ]}
              options={['对于项目信息确认无误']}
            />
          </StepsForm.StepForm>

        </StepsForm>
      </ProCard>
    </PageContainer>
  );
};

export default CreateProject


