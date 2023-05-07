import {ProList} from '@ant-design/pro-components';
import {Space, Tag} from 'antd';
import React from 'react';
import {getProjectVersionList} from '@/services/deployment/api';
import VersionPublishForm from "@/pages/Project/components/Version/components/VersionPublishForm";
import {convertVersion} from "@/common/utils";
import {Version, VersionEnvironment, VersionStatus, VersionTypes} from "@/services/deployment/version";


const ProjectVersionPage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  return (
    <ProList<Version>
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
            <Space>

              <Tag>{convertVersion(row.version)}</Tag>
              <Tag color={VersionStatus[row.status].color}>{VersionStatus[row.status].text}</Tag>
              {row.environments && row.environments.length > 0 ? row.environments.map(environment => {
                return <Tag color={VersionEnvironment[environment].color}>{VersionEnvironment[environment].text}</Tag>
              }) : <></>}
            </Space>

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


