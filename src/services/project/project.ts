export class Project {
  id!: number;
  uuid!: string;
  name: number | undefined;
  key!: string | undefined;
  type: string | undefined;
  status: string | undefined;
  version: number | undefined;
  owner: string | undefined;
  accessMode: string | undefined;
  description: string | undefined;
}

export class ProjectCmd {
  uuid: string | undefined;
  name: string | undefined;
  key: string | undefined;
  type: string | undefined;
  accessMode: string | undefined;
  pageTemplate: string | undefined;
  serviceTemplate: string | undefined;
  codeTemplates: string[] | undefined;
  infrastructures: string[] | undefined;
  description: string | undefined;
}

export class ProjectDetail extends Project {
}

export class Trend {
  id!: number;
  projectKey!: string;
  level!: string;
  message!: string;
  time!: number;
}


export const TrendLogLevelEnum = {
  INFO: {
    text: '动态',
    avatar: 'https://s.meshed.cn/meshed/svg/microservices.svg',
    description: '微服务系统中具体的微服务项目，业务服务项目选择',
    status: 'Success',
    color: '#2db7f5',
  },
  ERROR: {
    text: '错误',
    status: 'Processing',
    color: '#FA8072',
  },
  WARN: {
    text: '警告',
    status: 'Default',
    color: '#f3a846',
  },
  EXCEPTION: {
    text: '异常',
    status: 'Default',
    color: '#d91818',
  },
}


export const ProjectTypesEnum = {
  SERVICE: {
    text: '应用服务',
    avatar: 'https://s.meshed.cn/meshed/svg/microservices.svg',
    description: '微服务系统中具体的微服务项目，业务服务项目选择',
    status: 'Success',
    color: '#2db7f5',
  },
  ASSEMBLY: {
    text: '组件设施',
    avatar: 'https://s.meshed.cn/meshed/svg/assembly.svg',
    description: '作为系统中通用组成部分或者项目中特例的单独项目构成',
    status: 'Processing',
    color: '#FA8072',
  },
  INFRASTRUCTURE: {
    text: '生态设施',
    avatar: 'https://s.meshed.cn/meshed/svg/infrastructure.svg',
    description: '属于微服务生态体系中独有的项目设施，中间件等基础设施项目',
    status: 'Default',
    color: '#5BD8A6',
  },
}

export const PageTemplateEnum = {
  NONE: {
    text: '手动构建',
    status: 'Default',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    description: '针对老项目的研发模式，对于系统早于研发系统的情况下，可以快速兼容',
  },
  ANT_DESIGN_PRO: {
    text: 'Ant Design Pro (控制台)',
    status: 'Processing',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    description: '开箱即用的中台前端，作为系统通用的后台管理系统，可加入系统微应用体系',
  },
  MORE: {
    text: '敬请期待',
    status: 'Processing',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    description: '前端模板暂时只有一套，采用其他方案可以选择手动方式构建',
    disabled: true
  },
}

export const ServiceTemplateEnum = {
  NONE: {
    text: '手动构建',
    status: 'Default',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    description: '针对老项目的研发模式，对于系统早于研发系统的情况下，可以快速兼容',
  },
  COLA: {
    text: 'COLA架构',
    status: 'Success',
    avatar: 'https://s.meshed.cn/meshed/svg/domain.svg',
    description: '作为DDD领域驱动设计的一种变体设计模式，是研发系统主要的研发框架',
  },
  MVC: {
    text: '三层架构',
    status: 'Processing',
    avatar: 'https://s.meshed.cn/meshed/svg/mvc.svg',
    description: '符合“高内聚，低耦合”思想，把各个功能模块划分为表示层、逻辑层和数据层',
  },
}

export const ProjectAccessModeEnum = {
  PUBLIC: {
    text: '开源项目',
    status: 'Processing',
  },
  NONE: {
    text: '正常研发',
    status: 'Processing',
  },
  CORE: {
    text: '核心涉密',
    status: 'Error',
  },
  INNER_SOURCE: {
    text: '内部开源',
    status: 'Success',
  },
}

export const ProjectStatusEnum = {
  APPLY: {
    text: '审批',
    status: 'Processing',
  },
  RD: {
    text: '研发',
    status: 'Error',
  },
  RUN: {
    text: '运行',
    status: 'Success',
  },
  DEPRECATED: {
    text: '废弃',
    status: 'Success',
  },
}

export const ProjectAccessModeOptions = [
  {
    label: '研发项目',
    value: 'NONE',
  },
  {
    label: '内部开源',
    value: 'INNER_SOURCE',
  },
  {
    label: '核心涉密',
    value: 'CORE',
  },
]

