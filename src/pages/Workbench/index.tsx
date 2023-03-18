import {PageContainer, ProFormSelect} from '@ant-design/pro-components';
import {Card} from 'antd';
import React from 'react';

import Index from "@/pages/Project/components/ProjectList";
import {getProjectList} from "@/services/project/api";
import StatisticDashboard from "@/pages/Workbench/components/StatisticDashboard";


const Workbench: React.FC = () => {
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,

        }}
      >
        <div>
          <div style={{display: 'flex',}}>
            <StatisticDashboard/>
          </div>

          <Index
            leftFilters={[
              <ProFormSelect
                key='visitType'
                name="visitType"
                showSearch
                valueEnum={{
                  LATELY: '活跃项目',
                  MEMBER: '参与的项目',
                  OWNER: '负责项目',
                }}
                placeholder="项目类型"
              />,

            ]}
            filtersInitialValues={{
              visitType: 'LATELY',
            }}
            request={getProjectList}
          />

        </div>
      </Card>
    </PageContainer>
  );
};

export default Workbench;
