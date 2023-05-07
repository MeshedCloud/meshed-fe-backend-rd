import React, {useRef} from 'react';
import {ActionType, ProCard, ProList} from "@ant-design/pro-components";
import {Space} from "antd";
import Tag from 'antd/es/tag';
import {WarehouseTypes} from "@/services/deployment/warehouse";
import {getProjectWarehouseList} from "@/services/deployment/api";
import WarehouseAddForm from "@/pages/Project/components/Warehouse/components/WarehouseAddForm";
import {history} from "@umijs/max";


const ProjectWarehousePage: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProCard style={{minHeight: 500}}>
      <ProList<any>
        actionRef={actionRef}
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: false,
        }}
        request={(params) => getProjectWarehouseList(projectKey, {...params})}
        postData={data => {
          if (data && data.length > 0) {
            data.forEach(item => item.avatar = "https://s.meshed.cn/meshed/svg/git.svg")
          }
          console.log(data)
          return data
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{gutter: 16, column: 3}}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log("onClick", record);
              history.push({
                pathname: `/repo/${record.repoId}`
              })
            },
          };
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color={WarehouseTypes[row.purposeType]?.color}>{WarehouseTypes[row.purposeType]?.text}</Tag>
                </Space>
              );
            }
          },
          type: {
            dataIndex: 'type',
          },
          content: {
            dataIndex: 'repoName',
          },
          avatar: {
            dataIndex: 'avatar',
          },
          // actions: {
          //   cardActionProps: 'actions',
          //   render: (text, row) => [
          //     <Button size="small" type="link" icon={<ForkOutlined/>} onClick={() => {
          //       history.push({
          //         pathname: `/repo/${row.uuid}`
          //       })
          //     }}>前往</Button>,
          //     // <Button size="small" type="link" icon={<PullRequestOutlined/>} onClick={() => {
          //     //
          //     // }}>PR</Button>,
          //     <CopyBoard
          //       key={row.repoName}
          //       text={row.repoUrl}
          //       // target="#input"
          //       onSuccess={()=> successMsg("复制成功")}
          //       onError={(event) => {
          //         console.log(event)
          //       }}
          //     >
          //       <a><CopyOutlined />Https</a>
          //     </CopyBoard>,
          //   ],
          // },
        }}
        headerTitle="项目仓库"
        toolBarRender={() => [
          <WarehouseAddForm projectKey={projectKey} onFinish={() => actionRef.current?.reload()}/>
        ]
        }
      />
    </ProCard>
  );
};

export default ProjectWarehousePage


