import {ActionType, PageContainer, ProList} from '@ant-design/pro-components';
import React, {ReactText, useRef, useState} from 'react';
import {getPackagesList} from "@/services/deployment/api";
import {Packages} from "@/services/deployment/packages";
import {CopyOutlined} from '@ant-design/icons';
import {errorMsg, successMsg} from "@/common/messages";
import CopyBoard from "@/components/CopyBoard";
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
        rowKey="name"
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
                  <CodeBlock key={row.id} language="xml" code={`<dependency>
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
            render: (text, row) => [
              <CopyBoard
                key={row.id}
                text="py"
                onSuccess={() => successMsg("内容已经复制到剪切板啦")}
                onError={() => errorMsg("复制失败")}
              >
                <a>
                  <CopyOutlined/> 复制
                </a>
              </CopyBoard>

            ],
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


