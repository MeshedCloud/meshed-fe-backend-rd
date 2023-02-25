import {PageContainer, ProFormSelect} from '@ant-design/pro-components';
import {Card} from 'antd';
import React from 'react';

import ActionCard from "@/pages/Project/components/ActionCard";
import ProjectList from "@/pages/Project/components/ProjectList";
import {getProjectList} from "@/services/project/api";
import {PlusOutlined} from "@ant-design/icons";


const Project: React.FC = () => {
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,

        }}
      >
        <div>
          <div>
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
                >
                </div>
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
              right={<PlusOutlined />}
            />
          </div>

          <ProjectList
            leftFilters={[
              <ProFormSelect
                name="type"
                showSearch
                valueEnum={{
                  all: '全部项目',
                  service: '服务项目',
                }}
                placeholder="项目类型"
              />,
              <ProFormSelect
                name="domain"
                showSearch
                valueEnum={{
                  all: '全部',
                  security: '安全领域',
                  middle: '中台领域',
                  common: '通用领域',
                }}
                placeholder="板块"
              />
            ]}
            filtersInitialValues={{
              type: 'all',
              domain: 'all',
            }}
            request={getProjectList}
          />

        </div>
      </Card>
    </PageContainer>
  );
};

export default Project;
