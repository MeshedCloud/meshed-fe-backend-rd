import React from 'react';
import {ProCard} from "@ant-design/pro-components";

const ProjectSummary: React.FC<{ projectKey: string }> = ({projectKey}) => {
  console.log(projectKey)
  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={16} gutter={[0, 16]} ghost split={"horizontal"}>
          <ProCard title="研发中的项目" style={{height: 300}}/>
          <ProCard title="项目动态" style={{minHeight: 500}}/>
        </ProCard>
        <ProCard colSpan={8} gutter={[0, 16]} ghost split={"horizontal"}>
          <ProCard title="公告" style={{height: 400}}/>
          <ProCard title="项目指标" style={{height: 400}}/>
        </ProCard>
      </ProCard>

    </ProCard>
  );
};

export default ProjectSummary


