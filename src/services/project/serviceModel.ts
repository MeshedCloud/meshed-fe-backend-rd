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
  uuid!: string;
  name: string | undefined;
  className: string | undefined;
  version: string | undefined;
  type: string | undefined;
  status: string | undefined;
  releaseStatus: string | undefined;
}

export class ProjectModelDetails {
  id!: number;
  name!: number;
  enname!: number;
  className: string | undefined;
  version: string | undefined;
  type: string | undefined;
  fields: RequestParamField[] | undefined;
  status: string | undefined;
  releaseStatus: string | undefined;
  description: string | undefined;
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


export class ProjectServiceGroup {
  uuid!: string;
  groupId!: string;
  name: string | undefined;
  className: string | undefined;
  type: string | undefined;
  uri: string | undefined;
  packageName: string | undefined;
  domainKey: string | undefined;
  projectKey: string | undefined;
  description: string | undefined;
}


export class ProjectService {
  uuid!: string;
  name: string | undefined;
  groupId: string | undefined;
  version: string | undefined;
  type: string | undefined;
  status: string | undefined;
  releaseStatus: string | undefined;
}

export class ProjectServiceDetails {
  id!: number;
  name: number | undefined;
  method: string | undefined;
  control: string | undefined;
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
export const BaseSuperClass = ['DTO', 'Query', 'Command', 'Double', 'PageQuery', 'Event', 'SecurityEvent']
export const TypeToSuperClassMap = {
  'DTO': 'DTO',
  'QUERY': 'Query',
  'COMMAND': 'Command',
  'EVENT': 'Event',
}
export const BaseGenerics = [
  {
    value: 'NONE',
    label: '无',
  },
  {
    value: 'LIST',
    label: 'List',
  },
  {
    value: 'SET',
    label: 'Set',
  },
]

export const ModelTypes = {

  COMMAND: {
    color: '#2db7f5',
    text: '操作',
    avatar: 'https://s.meshed.cn/meshed/svg/cmd.svg',
    description: '系统模型遵循CQRS模式下的行为规范，读写分离，如果作为操作模型选择',
    name: 'Cmd'
  },
  QUERY: {
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
  ENUM: {
    color: '#108ee9',
    text: '枚举',
    avatar: 'https://s.meshed.cn/meshed/svg/model.svg',
    description: '枚举类型，提高代码维护性，确保变量合法',
    name: 'Enum'
  },
  EVENT: {
    color: '#108ee9',
    text: '事件',
    avatar: 'https://s.meshed.cn/meshed/svg/model.svg',
    description: '事件数据，主要用于定义事件传递模型的数据对象',
    name: 'Event'
  },

}

export const ServiceStatus = {
  RELEASE: {
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
  OFF: {
    color: '#ded9d9',
    text: '下线'
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

export const RequestTypes = {

  GET: {
    color: '#009966',
    text: 'GET',
  },
  POST: {
    color: '#FFCC33',
    text: 'POST',
  },
  PUT: {
    color: '#FF6666',
    text: 'PUT',
  },
  DELETE: {
    color: '#CC3333',
    text: 'DELETE',
  },
  PATCH: {
    color: '#2db7f5',
    text: 'PATCH',
  },
  RPC: {
    color: '#FF6600',
    text: 'RPC',
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
export const AccessModeOptions = [
  {
    label: '匿名',
    value: 'ANONYMOUS',
  },
  {
    label: '登入',
    value: 'LOGIN',
  },
  {
    label: '授权',
    value: 'AUTHORIZE',
  },
]
export const RequestModeOptions = [
  {
    label: '参数',
    value: 'MULTIPLE',
  },
  {
    label: '表单',
    value: 'FORM',
  },
  {
    label: 'JSON',
    value: 'JSON',
  },

  {
    label: '分页',
    value: 'PAGE',
  },
]


export const PathVariableItem = {value: 'PATH_VARIABLE', label: '路径参数',}
export const RequestBodyItem = {value: 'REQUEST_BODY', label: 'JSON',}
