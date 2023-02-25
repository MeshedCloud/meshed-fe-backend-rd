export class BaseField {
  fieldName!: string;
  fieldType!: string;
  generic!: string;
  explain?: string;
}

export class RequestParamField extends BaseField {
  mock: string | undefined;
  rule: string | undefined;
  nonNull!: boolean;
}

export class RequestBodyField extends BaseField {
  nonNull!: boolean;
}

export class ResponsesField extends BaseField {

}

export class ProjectModel {
  id!: number;
  name: number | undefined;
  className: string | undefined;
  version: string | undefined;
  type: string | undefined;
  status: string | undefined;
}

export class ProjectModelDetails {
  id!: number;
  name!: number;
  enname!: number;
  className: string | undefined;
  version: string | undefined;
  type: string | undefined;
  status: string | undefined;
}

export class ProjectModelCount {
  all!: number;
  api: string | undefined;
  rpc: string | undefined;
  release: string | undefined;
  edit: string | undefined;
  processing: string | undefined;
  reject: string | undefined;
}


export class ProjectService {
  id!: number;
  name: number | undefined;
  api: string | undefined;
  version: string | undefined;
  type: string | undefined;
  status: string | undefined;
  progress: string | undefined;
}

export class ProjectServiceDetails {
  id!: number;
  name: number | undefined;
  enname: string | undefined;
  uri: string | undefined;
  domain: string | undefined;
  requestType: string | undefined;
  behavior: string | undefined;
  identifier: string | undefined;
  describe: string | undefined;
  requestParams: RequestParamField | undefined;
  requestBodys: RequestBodyField | undefined;
  responses: ResponsesField | undefined;
  version: string | undefined;
  type: string | undefined;
  status: string | undefined;
  progress: string | undefined;
}

export class ProjectServiceCount {
  all!: number;
  api: string | undefined;
  rpc: string | undefined;
  release: string | undefined;
  edit: string | undefined;
  processing: string | undefined;
  reject: string | undefined;
}

export const BaseFields = ['String', 'Integer', 'Long', 'Double', 'Float', 'Boolean']
export const BaseGenerics = [
  {
    value: 'NONE',
    label: '无',
  },
  {
    value: 'List',
    label: 'List',
  },
  {
    value: 'Set',
    label: 'Set',
  },
]

export const ModelTypes = {

  CMD: {
    color: '#2db7f5',
    text: '操作',
    avatar: 'https://s.meshed.cn/meshed/svg/cmd.svg',
    description: '系统模型遵循CQRS模式下的行为规范，读写分离，如果作为操作模型选择',
    name: 'Cmd'
  },
  QRY: {
    color: '#5BD8A6',
    text: '查询',
    avatar: 'https://s.meshed.cn/meshed/svg/query.svg',
    description: '系统模型遵循CQRS模式下的行为规范，读写分离，如果作为查询模型选择',
    name: 'Qry'
  },
  DTO: {
    color: '#108ee9',
    text: '数据',
    avatar: 'https://s.meshed.cn/meshed/svg/model.svg',
    description: '数据作为内部传输和返回外部数据模型的数据结构',
    name: 'DTO'
  },

}

export const ServiceStatus = {
  PROD: {
    color: '#2db7f5',
    text: '已上线'
  },
  DEV: {
    color: '#87d068',
    text: '研发中'
  },
  TEST: {
    color: '#108ee9',
    text: '测试中'
  },
  DEPRECATED: {
    color: '#808080',
    text: '废弃'
  },
  BUG: {
    color: '#f50',
    text: '异常'
  },
}

export const ServiceTypes = {

  API: {
    color: '#2db7f5',
    text: 'RESTful',
    key: 'API',
    avatar: 'https://s.meshed.cn/meshed/svg/http.svg',
    description: 'RESTful 接口应该使用标准的HTTP方法如GET，PUT和POST，并遵循这些方法的语义。',
  },
  RPC: {
    color: '#5BD8A6',
    text: 'RPC',
    key: 'RPC',
    avatar: 'https://s.meshed.cn/meshed/svg/dubbo.svg',
    description: '目前平台对于RPC客户端仅适配Apache Dubbo Java版本，用与减少接口定义的成本。',
  },

}

export const RequestTypeOptions = [
  {
    label: 'Get',
    value: 'GET',
  },
  {
    label: 'Post',
    value: 'POST',
  },
  {
    label: 'Put',
    value: 'PUT',
  },
  {
    label: 'Delete',
    value: 'DELETE',
  }, {
    label: 'Patch',
    value: 'PATCH',
  },

]
export const ServiceBehaviorOptions = [

  {
    label: '查询',
    value: 'QRY',
  },
  {
    label: '操作',
    value: 'CMD',
  },
  {
    label: '分页查询',
    value: 'PAGE',
  },
]

export const PathVariableItem = {value: 'PATH_VARIABLE', label: '路径参数',}
