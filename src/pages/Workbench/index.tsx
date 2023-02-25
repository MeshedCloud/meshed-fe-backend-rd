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
                name="type"
                showSearch
                valueEnum={{
                  lately: '活跃项目',
                  member: '参与的项目',
                  owner: '服务项目',
                }}
                placeholder="项目类型"
              />,

            ]}
            filtersInitialValues={{
              type: 'lately',
            }}
            request={getProjectList}
          />

        </div>
      </Card>
    </PageContainer>
  );
};

export default Workbench;
