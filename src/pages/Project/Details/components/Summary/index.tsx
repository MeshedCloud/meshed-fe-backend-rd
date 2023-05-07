import React, {useEffect, useState} from 'react';
import {ProCard} from "@ant-design/pro-components";
import {Space, Tag, Timeline} from "antd";
import {Trend, TrendLogLevelEnum} from "@/services/project/project";
import {getProjectTrendList} from "@/services/project/api";
import {timeToDate} from "@/common/time";
import CodeBlock from "@/components/CodeBlock";
import {getPackagesList} from "@/services/deployment/api";
import {Packages} from "@/services/deployment/packages";

const ProjectSummary: React.FC<{ projectKey: string }> = ({projectKey}) => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [packages, setPackages] = useState<Packages[]>([]);

  useEffect(() => {
    getProjectTrendList(projectKey).then(res => {
      if (res.success && res.data) {
        console.log(res)
        setTrends(res.data)
      }
    })
    getPackagesList({projectKey}).then(res => {
      if (res.success && res.data) {
        console.log(res)
        setPackages(res.data)
      }
    })
  }, []);
  console.log(projectKey)
  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={12} gutter={[0, 16]} ghost split={"horizontal"}>
          <ProCard title="项目动态" style={{minHeight: 500}}>
            <Timeline>
              {
                trends.length <= 0 ? <></> : trends.map(trend => {
                  return <Timeline.Item>
                    <div>
                      <Space>
                        {timeToDate(trend.time)}<Tag
                        color={TrendLogLevelEnum[trend.level].color}>{TrendLogLevelEnum[trend.level].text}</Tag>
                      </Space>
                      <div>
                        {trend.message}
                      </div>
                    </div>
                  </Timeline.Item>
                })


              }
            </Timeline>
          </ProCard>
        </ProCard>
        <ProCard colSpan={12} gutter={[0, 16]} ghost split={"horizontal"}>
          <ProCard title="制品" style={{height: 500}}>
            {
              packages.length <= 0 ? <></> : packages.map(item => {
                return <div>
                  <div>{item.name}</div>
                  <CodeBlock language="xml" code={`<dependency>
  <groupId>${item.groupId}</groupId>
  <artifactId>${item.artifactId}</artifactId>
  <version>${item.version}</version>
</dependency>`}/>
                </div>
              })
            }

          </ProCard>
        </ProCard>
      </ProCard>

    </ProCard>
  );
};

export default ProjectSummary
