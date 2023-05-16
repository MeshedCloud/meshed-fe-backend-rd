import {ActionType, PageContainer, ProList} from '@ant-design/pro-components';
import React, {ReactText, useRef, useState} from 'react';
import {getPackagesList} from "@/services/deployment/api";
import {Packages} from "@/services/deployment/packages";
import CodeBlock from "@/components/CodeBlock";
import PackagesForm from './components/PackagesForm';


const ProjectPackagePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [keyword, setKeyword] = useState<string>();
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('MAVEN');
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);


  return (
    <PageContainer>
      <ProList<Packages>
        rowKey="id"
        actionRef={actionRef}
        expandable={{expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys}}
        request={params => getPackagesList({projectKey: undefined, keyword, ...params})}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            render: (_, row) => {
              return (
                <span>{row.groupId}:{row.artifactId}:{row.version}</span>
              );
            },
          },
          description: {
            render: (_, row) => {
              return (
                <div>
                  <CodeBlock codeKey={row.id} language="xml" code={`<dependency>
  <groupId>${row.groupId}</groupId>
  <artifactId>${row.artifactId}</artifactId>
  <version>${row.version}</version>
</dependency>`}/>
                </div>
              );
            },
          },
          content: {},
          actions: {
            render: (text, row) => [],
          },
        }}
        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: 'MAVEN',
                label: "Maven",
              },
            ],
            onChange(key) {
              setActiveKey(key);
              actionRef.current?.reload()
            },
          },
          search: {
            onSearch: (value: string) => {
              setKeyword(value);
              actionRef.current?.reload()
            },
          },
          actions: [
            <PackagesForm onFinish={data => {
              actionRef.current?.reload()
            }}/>,
          ],
        }}
        pagination={{
          pageSize: 10,
        }}
      />
    </PageContainer>
  );
};

export default ProjectPackagePage


