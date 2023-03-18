export class Warehouse {
  uuid!: string;
  name: string | undefined;
  version: string | undefined;
  type!: string;
  purposeType!: string;
  status!: string;
}

export class WarehouseCmd {
  projectKey!: string;
  name!: string;
  repoName!: string;
  accessToken: string | undefined;
  repoUrl: string | undefined;
  purposeType!: string;
  description!: string;
  operate!: string;
  engineTemplate?: string;
}

export const WarehouseTypes = {
  SERVICE: {
    color: '#2db7f5',
    text: '服务'
  },
  PAGE: {
    color: '#87d068',
    text: '前端'
  },
  CONSOLE: {
    color: '#87d068',
    text: '控制台'
  },
  CLIENT: {
    color: '#108ee9',
    text: '客户端'
  },
  ASSEMBLY: {
    color: '#FA8072',
    text: '组件'
  },
}

export const WarehouseOperateOptions = [
  {
    label: '新增',
    value: 'NEW',
  },
  {
    label: '导入',
    value: 'IMPORT',
  },
]

export const PurposeTypeOptions = [
  {
    label: '服务',
    value: 'SERVICE',
  },
  {
    label: '客户端',
    value: 'CLIENT',
  },
  {
    label: '组件',
    value: 'ASSEMBLY',
  },
  {
    label: '控制台',
    value: 'CONSOLE',
  },
  {
    label: '页面',
    value: 'PAGE',
  },
]

export const ServiceEngineTypes = {

  COLA: {
    color: '#2db7f5',
    text: 'Meshed Cloud COLA',
    key: 'meshed-cloud-archetype',
    avatar: 'https://s.meshed.cn/meshed/svg/domain.svg',
    description: '作为DDD领域驱动设计的一种变体设计模式，是研发系统主要的研发框架',
  },
  MVC: {
    color: '#2db7f5',
    text: 'Meshed Cloud 三层架构',
    key: 'meshed-cloud-mvc-archetype',
    avatar: 'https://s.meshed.cn/meshed/svg/mvc.svg',
    description: '符合“高内聚，低耦合”思想，把各个功能模块划分为表示层、逻辑层和数据层',
  },

}
export const ClientEngineTypes = {
  standard: {
    color: '#2db7f5',
    text: 'Meshed Cloud COLA Client',
    key: 'meshed-cloud-client-archetype',
    avatar: 'https://s.meshed.cn/meshed/svg/domain.svg',
    description: '作为服务服务架构下对外开放的接口领域',
  }
}
export const ConsoleEngineTypes = {
  ANT_DESIGN_PRO: {
    text: 'Ant Design Pro (控制台)',
    status: 'Processing',
    key: 'meshed-fe-backend-archetype',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    description: '开箱即用的中台前端，作为系统通用的后台管理系统，可加入系统微应用体系',
  },
}
