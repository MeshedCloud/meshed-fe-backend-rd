import React from 'react';
import {EllipsisOutlined} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {Dropdown} from "antd";
import './index.less';

import type {Project} from "@/services/project/project";
import {ProjectStatusEnum, ProjectTypesEnum} from "@/services/project/project";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        进入项目
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        项目设置
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        删除项目
      </a>
    ),
  },
];

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const ProjectItem: React.FC<{
  data: Project;
}> = ({data}) => {
  return (
    <div
      className="item"
      style={{
        minWidth: '260px',
        maxWidth: '260px',
        minHeight: '240px',
        maxHeight: '260px',
        position: "relative"

      }}
    >

      <div className="ribbon ribbon-top-right">
        {
          (data.status === 'APPLY' || data.status === 'DEPRECATED') ? <span style={{
            backgroundColor: ProjectStatusEnum[data.status].color
          }}>{ProjectStatusEnum[data.status].text}</span> : <span style={{
            backgroundColor: ProjectTypesEnum[data.type].color
          }}>{ProjectTypesEnum[data.type].text}</span>
        }

      </div>

      <div
        style={{
          display: 'flex',
          gap: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '180px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          backgroundColor: ' #f5f5f5',
          backgroundImage: 'repeating-linear-gradient(90deg, hsla(298,16%,68%,0.06) 0px, hsla(298,16%,68%,0.06) 1px,transparent 1px, transparent 21px,hsla(298,16%,68%,0.06) 21px, hsla(298,16%,68%,0.06) 22px,transparent 22px, transparent 72px),repeating-linear-gradient(0deg, hsla(298,16%,68%,0.06) 0px, hsla(298,16%,68%,0.06) 1px,transparent 1px, transparent 21px,hsla(298,16%,68%,0.06) 21px, hsla(298,16%,68%,0.06) 22px,transparent 22px, transparent 72px),repeating-linear-gradient(135deg, hsla(298,16%,68%,0.06) 0px, hsla(298,16%,68%,0.06) 1px,transparent 1px, transparent 21px,hsla(298,16%,68%,0.06) 21px, hsla(298,16%,68%,0.06) 22px,transparent 22px, transparent 72px),linear-gradient(90deg, hsl(275,3%,97%),hsl(275,3%,97%))'
          // backgroundImage:"url('http://s.meshed.cn/meshed/bg/card-backbound.svg')"
        }}
      >

        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            fontFamily: 'STXinwei',
            color: 'rgba(0, 0, 0, 0.85)',
            paddingBottom: 8,
          }}
        >
          {data.name}
        </div>

      </div>

      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px'
        }}
      >

        <div
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
            {data.name?.toString().substring(0, 1)}
          </div>

          <div
            style={{
              fontSize: '16px',
              color: 'rgba(0, 0, 0, 0.85)',
              paddingBottom: 8,
            }}
          >
            <span
              style={{}}
            >{data.name}</span>
          </div>
        </div>

        <div
          style={{
            fontSize: '28px'
          }}
        >
          <Dropdown menu={{items}} placement="top" arrow>
            <EllipsisOutlined/>
          </Dropdown>

        </div>
      </div>
    </div>
  );
};


export default ProjectItem
