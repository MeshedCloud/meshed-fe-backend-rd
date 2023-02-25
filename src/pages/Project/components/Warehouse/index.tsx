import React, {useEffect, useState} from 'react';
import {LightFilter, ProCard, ProFormSelect} from "@ant-design/pro-components";
import {FilterOutlined} from "_@ant-design_icons@4.7.0@@ant-design/icons";
import {Button, Input, Pagination} from "_antd@4.24.2@antd";
import {Space} from "antd";
import {BranchesOutlined, CopyOutlined, EllipsisOutlined} from "@ant-design/icons";
import Tag from 'antd/es/tag';
import {Warehouse, WarehouseTypes} from "@/services/deployment/warehouse";
import {getProjectWarehouseList} from "@/services/deployment/api";

const pageSize = 20;
const filtersInitialValues = {type: 'all', domain: 'all'}

const ProjectWarehousePage: React.FC<{ projectKey: string }> = ({projectKey}) => {

  const [dataSource, setDataSource] = useState<Warehouse[]>([]);
  const [total, setTotal] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>()
  const [current, setCurrent] = useState<number>(1)
  const [filterParams, setFilterParams] = useState<any>({})

  const getList = (params: {}, pageIndex?: number,) => {
    params['pageSize'] = pageSize;
    params['pageIndex'] = pageIndex ? pageIndex : current;
    getProjectWarehouseList(projectKey, params).then(async res => {
      if (res.success && res.data) {
        setDataSource(res.data)
        setTotal(res.total ? res.total : 0)
      } else {
        setTotal(0)
      }
    })

  }

  const onSearch = (value: string) => {
    const params: any = Object.assign({}, filterParams);
    params['keyword'] = value;
    setKeyword(value)
    getList(params)
  };

  const onChange = (value: number) => {
    const params: any = Object.assign({}, filterParams);
    params['keyword'] = keyword;
    setCurrent(value)
    getList(params, value)
  };
  useEffect(() => {
    const params: any = Object.assign({}, filtersInitialValues);
    setFilterParams(params)
    getList(params);
  }, []);
  return (
    <ProCard style={{minHeight: 700}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/*left*/}
        <div>
          <LightFilter
            initialValues={{type: 'all', domain: 'all'}}
            bordered
            collapseLabel={<FilterOutlined/>}
            onFinish={async (values) => {
              console.log(values)
            }}
          >
            <ProFormSelect
              name="type"
              showSearch
              valueEnum={{
                all: '全部项目',
                service: '服务项目',
              }}
              placeholder="项目类型"
            />
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
          </LightFilter>
        </div>
        {/*right*/}
        <div
          style={{
            display: 'flex',
          }}
        >
          <Input.Search placeholder="搜索项目" onSearch={onSearch} enterButton allowClear/>
          <Button type="primary" key="primary">
            新建仓库
          </Button>,
        </div>
      </div>
      <Space
        style={{
          margin: 20, display: 'flex',
          flexWrap: 'wrap',
          flexShrink: 0,
          gap: 30,
        }}
      >
        {
          dataSource.map(data => {
            return <ProCard
              title={data.name}
              extra={data.version}
              style={{minWidth: 320}}
              bordered
              actions={[
                <BranchesOutlined/>,
                <CopyOutlined/>,
                <EllipsisOutlined key="ellipsis"/>,
              ]}
            >
              <div><Tag
                color={WarehouseTypes[data.type].color}>
                {WarehouseTypes[data.type].text}
              </Tag>{data.enname}
              </div>
            </ProCard>
          })
        }
      </Space>
      {
        (total > pageSize ?
          <Pagination style={{marginTop: 50, marginBottom: 50,}} onChange={onChange} size="small" total={total}
                      defaultPageSize={pageSize}/> : '')
      }
    </ProCard>
  );
};

export default ProjectWarehousePage


