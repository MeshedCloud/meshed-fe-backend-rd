import {ProCard, StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useState} from 'react';

const StatisticDashboard: React.FC<{}> = ({}) => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="研发数据"
        extra="2019年9月28日"
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <ProCard colSpan="40%" split="horizontal">
          <ProCard split="vertical">
            <StatisticCard
              statistic={{
                title: '昨日全部流量',
                value: 234,
              }}
            />
            <StatisticCard
              statistic={{
                title: '本月累计流量',
                value: 234,
              }}
            />
          </ProCard>
          <ProCard split="vertical">
            <StatisticCard
              statistic={{
                title: '运行中实验',
                value: '12/56',
                suffix: '个',
              }}
            />
            <StatisticCard
              statistic={{
                title: '历史实验总数',
                value: '134',
                suffix: '个',
              }}
            />
          </ProCard>
        </ProCard>
        <ProCard title="待办事务">
          <div style={{height: 260}}>左侧内容</div>
        </ProCard>
        <ProCard title="公告栏" colSpan="30%">
          <div style={{height: 260}}>右侧内容</div>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

export default StatisticDashboard
