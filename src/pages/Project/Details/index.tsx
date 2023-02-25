import {ArrowLeftOutlined, EllipsisOutlined} from '@ant-design/icons';
import {PageContainer, ProDescriptions,} from '@ant-design/pro-components';
import {Button, Dropdown} from 'antd';
import React, {useEffect, useState} from 'react';
import ProjectSummary from "@/pages/Project/Details/components/Summary";
import ProjectWarehouse from "@/pages/Project/components/Warehouse";
import ProjectService from "@/pages/Project/components/Service";
import ProjectVersion from "@/pages/Project/components/Version";
import ProjectSetting from "@/pages/Project/Details/components/Setting";
import type {ProjectDetail} from "@/services/project/project";
import {ProjectAccessModeEnum, ProjectStatusEnum, ProjectTypesEnum} from "@/services/project/project";
import {getProjectDetails} from "@/services/project/api";
import {Link, useMatch} from "@@/exports";
import ProjectModel from "@/pages/Project/components/Model";


const tabs = [
  {
    tab: '概要',
    key: 'summary',
  },
  {
    tab: '服务',
    key: 'service',
  },
  {
    tab: '模型',
    key: 'model',
  },
  {
    tab: '仓库',
    key: 'warehouse',
  },
  {
    tab: '版本',
    key: 'version',
  },
  {
    tab: '设置',
    key: 'setting',
  },
]

const readerActivityContent = (type: string, key: string) => {
  switch (type) {
    case 'summary':
      return <ProjectSummary projectKey={key}/>
    case 'service':
      return <ProjectService projectKey={key}/>
    case 'model':
      return <ProjectModel projectKey={key}/>
    case 'warehouse':
      return <ProjectWarehouse projectKey={key}/>
    case 'version':
      return <ProjectVersion projectKey={key}/>
    case 'setting':
      return <ProjectSetting projectKey={key}/>
    default:
      return <ProjectSummary projectKey={key}/>
  }
}

const ProjectDetails: React.FC = () => {
  // @ts-ignore
  const {params: {projectKey, type}} = useMatch('/project/details/:type/:projectKey')

  console.log('ProjectDetails', projectKey)
  const [data, setData] = useState<ProjectDetail>()
  const [activityKey, setActivityKey] = useState<string>(type ? type : 'summary')
  const getProjectDetailsData = (p_code: string) => {
    getProjectDetails(p_code).then(res => {
      if (res && res.success) {
        setData(res.data)
      }
    })
  }


  useEffect(() => {
    getProjectDetailsData(projectKey);
  });

  return (
    <PageContainer
      fixedHeader
      content={(
        <div
          style={{
            display: 'flex',
            minHeight: "100px"
          }}
        >
          <div>
            <ProDescriptions style={{maxWidth: '800px'}} column={3}>
              <ProDescriptions.Item label="项目代号" valueType="text">
                {data?.key}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="负责人" valueType="text">
                {data?.owner}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="版本" valueType="text">
                {data?.version}
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="项目类型"
                valueEnum={ProjectTypesEnum}
              >
                {data?.type}
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="项目级别"
                valueEnum={ProjectAccessModeEnum}
              >
                {data?.accessMode}
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="项目状态"
                valueEnum={ProjectStatusEnum}
              >
                {data?.status}
              </ProDescriptions.Item>


              <ProDescriptions.Item label="项目描述" span={2} valueType="text">
                {data?.detail}
              </ProDescriptions.Item>
            </ProDescriptions>
            <Link to={`/project`}><ArrowLeftOutlined/>前往项目页</Link>
          </div>
        </div>
      )}
      header={{
        style: {background: "white"},
        title: '研发中心',
        ghost: true,

        extra: [
          <Button key="1">次要按钮</Button>,
          <Button key="2">次要按钮</Button>,
          <Button key="3" type="primary">
            主要按钮
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            menu={{
              items: [
                {
                  label: '下拉菜单',
                  key: '1',
                },
                {
                  label: '下拉菜单2',
                  key: '2',
                },
                {
                  label: '下拉菜单3',
                  key: '3',
                },
              ],
            }}
          >
            <Button key="4" style={{padding: '0 8px'}}>
              <EllipsisOutlined/>
            </Button>
          </Dropdown>,
        ],
      }}
      tabList={tabs}
      tabProps={{
        activeKey: activityKey,
        // type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
        onChange: (activeKey) => {
          setActivityKey(activeKey)
        }
      }}
    >
      {readerActivityContent(activityKey, projectKey)}
    </PageContainer>
  );
};

export default ProjectDetails


