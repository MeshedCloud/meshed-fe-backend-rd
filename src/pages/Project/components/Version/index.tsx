import {ProList} from '@ant-design/pro-components';
import {Space, Tag} from 'antd';
import React from 'react';
import {getProjectVersionList} from '@/services/deployment/api';
import VersionPublishForm from "@/pages/Project/components/Version/components/VersionPublishForm";
import {convertVersion} from "@/common/utils";
import {VersionTypes} from "@/services/deployment/version";


const ProjectVersionPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  return (
    <ProList<any>
      rowKey="name"
      request={params => getProjectVersionList(projectKey, params)}
      metas={{
        title: {
          dataIndex: 'name',
        },
        description: {
          dataIndex: 'versionName',
        },
        subTitle: {
          render: (_, row) => {
            return (
              <Space size={0}>
                <Tag color={VersionTypes[row.type]?.color}>{VersionTypes[row.type]?.text}</Tag>

              </Space>
            );
          },
        },
        content: {
          render: (_, row) => (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '200px',
                }}
              >
                {convertVersion(row.version)}
              </div>
            </div>
          ),
        },
        actions: {
          render: (text, row) => [
            <VersionPublishForm operate="edit" projectKey={projectKey} versionId={row.id}
                                sourceId={row.sourceId} version={convertVersion(row.version)}/>,
          ],
        },
      }}
      toolbar={{
        actions: [
          <VersionPublishForm operate="new" projectKey={projectKey}/>
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default ProjectVersionPage


