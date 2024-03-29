import React, {useEffect, useState} from 'react';
import {FilterOutlined} from "@ant-design/icons";
import {LightFilter} from "@ant-design/pro-components";
import ProjectItem from "@/pages/Project/components/ProjectItem";
import {Input, Pagination} from "antd";
import type {SortOrder} from 'antd/es/table/interface';
import type {Store} from "rc-field-form/lib/interface";
import type {Project} from "@/services/project/project";
import {Link} from "@@/exports";


const pageSize = 8;
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const ProjectList: React.FC<{
  leftFilters?: React.ReactNode[];
  filtersInitialValues?: Store;
  request?: (params: {
    pageSize?: number;
    pageIndex?: number;
    keyword?: string;
  }, sort?: Record<string, SortOrder>, filter?: Record<string, React.ReactText[] | null>) => Promise<any>;
}> = ({leftFilters, filtersInitialValues, request}) => {
  const [list, setList] = useState<Project[]>([])
  const [total, setTotal] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>()
  const [current, setCurrent] = useState<number>(1)
  const [filterParams, setFilterParams] = useState<any>({})


  const getList = (params: any, pageIndex?: number) => {
    params.pageSize = pageSize;
    params.pageIndex = pageIndex ? pageIndex : current;
    request?.(params).then(async res => {
      if (res.success && res.data) {
        setList(res.data)
        setTotal(res.total ? res.total : 0)
      } else {
        setTotal(0)
      }
    })

  }

  const onSearch = (value: string) => {
    const params: any = Object.assign({}, filterParams);
    params.keyword = value;
    setKeyword(value)
    getList(params)
  };


  const onChange = (value: number) => {
    const params: any = Object.assign({}, filterParams);
    params.keyword = keyword;
    setCurrent(value)
    getList(params, value)
  };

  useEffect(() => {
    const params: any = Object.assign({}, filtersInitialValues);
    setFilterParams(params)
    getList(params);
  }, [filtersInitialValues]);
  return (
    <div>
      <div
        style={{
          marginLeft: 50,
          marginRight: 50,
          marginTop: 30,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/*left*/}
        <div>
          <LightFilter
            initialValues={filtersInitialValues}
            bordered
            collapseLabel={<FilterOutlined/>}
            onFinish={async (values) => {
              setFilterParams(values)
              getList(values);
            }}
          >
            {
              leftFilters?.map(leftFilter => {
                return leftFilter
              })
            }
          </LightFilter>
        </div>

        {/*right*/}
        <div>
          <Input.Search placeholder="搜索项目" onSearch={onSearch} enterButton allowClear/>
        </div>
      </div>


      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexShrink: 0,
          gap: 30,
          marginLeft: 50,
          marginTop: 50,
          marginBottom: 50,

        }}
      >
        {
          list.map((item) => {
            return (<Link to={`/project/details/${item.key}`}><ProjectItem data={item}/></Link>)
          })
        }


      </div>

      {
        (total > 8 ?
          <Pagination style={{marginLeft: 50, marginBottom: 50,}} onChange={onChange} size="small" total={total}
                      defaultPageSize={pageSize}/> : '')
      }

    </div>
  );
};


export default ProjectList
