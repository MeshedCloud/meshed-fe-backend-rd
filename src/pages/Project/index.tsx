import {PageContainer, ProFormSelect} from '@ant-design/pro-components';
import {Card} from 'antd';
import React from 'react';

import ActionCard from "@/pages/Project/components/ActionCard";
import ProjectList from "@/pages/Project/components/ProjectList";
import {getProjectList} from "@/services/project/api";
import {PlusOutlined} from "@ant-design/icons";
import {ProjectAccessModeEnum, ProjectTypesEnum} from "@/services/project/project";
import {Access, useAccess} from 'umi';


const Project: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,

        }}
      >
        <div>
          <div>
            <Access accessible={access.canManage}>
              <ActionCard
                to="/project/create"
                left={<div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',

                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      lineHeight: '22px',
                      backgroundSize: '100%',
                      textAlign: 'center',
                      padding: '8px 16px 16px 12px',
                      color: '#FFF',
                      fontWeight: 'bold',
                      backgroundImage:
                        "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
                    }}
                  />
                  <div
                    style={{
                      fontSize: '18px',
                      color: 'rgba(0, 0, 0, 0.85)',
                      paddingBottom: 8,
                    }}
                  >
                    发起立项
                  </div>
                </div>}
                right={<PlusOutlined/>}
              />
            </Access>

          </div>

          <ProjectList
            leftFilters={[
              <ProFormSelect
                key='type'
                name="type"
                showSearch
                valueEnum={ProjectTypesEnum}
                placeholder="项目类型"
              />,
              <ProFormSelect
                key='accessMode'
                name="accessMode"
                showSearch
                valueEnum={ProjectAccessModeEnum}
                placeholder="项目级别"
              />
            ]}
            filtersInitialValues={{
              type: '',
              accessMode: '',
            }}
            request={getProjectList}
          />

        </div>
      </Card>
    </PageContainer>
  );
};

export default Project;
