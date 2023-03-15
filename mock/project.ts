import {Request, Response} from 'express';
import {SUCCESS_RESPONSE} from './commonMock';

const getProjectList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      {
        uuid: "rd",
        name: '研发中心',
        key: 'rd',
        type: 0,
      },
      {
        uuid: 'WORKFLOW',
        name: '流程中心',
        key: 'WORKFLOW',
        type: 0,
      },
      {
        uuid: 'PLATFORM',
        name: '平台中心',
        key: 'PLATFORM',
        type: 0,
      },
      {
        uuid: 'IAM',
        name: '身份中心',
        key: 'IAM',
        type: 0,
      },
      {
        uuid: 'DATA',
        name: '数据中心',
        key: 'DATA',
        type: 0,
      },
      {
        uuid: 'SECURITY',
        name: '安全中心',
        key: 'SECURITY',
        type: 0,
      },
      {
        uuid: 'COMMON',
        name: '通用组件',
        key: 'COMMON',
        type: 0,
      },
      {
        uuid: 'SERIALIZE',
        name: '序列化',
        key: 'SERIALIZE',
        type: 0,
      },
      {
        uuid: 'data-c',
        name: '数据组件',
        key: 'data-c',
        type: 0,
      },
      {
        uuid: 'CQRS',
        name: '标准化',
        key: 'CQRS',
        type: 0,
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getProjectDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      uuid: 1,
      name: '研发中心',
      key: 'IAM',
      type: 'SERVICE',
      status: 'APPLY',
      owner: '李四',
      accessMode: 'NORMAL',
      version: '1.0.2',
      detail: '研发中心xxxxxxxxxxxxx',
    },
  });
};


const saveProject = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};


const deleteProject = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};


const getProjectServiceList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      {
        id: 1,
        uuid: 1,
        name: '研发项目列表',
        api: '/rd/project/list',
        type: 'API',
        status: 'DEV',
        releaseStatus: 'DEV',
        version: '1.0.2',
      },
      {
        id: 2,
        uuid: 2,
        name: '研发项目详情',
        api: '/rd/project/desc',
        type: 'API',
        status: 'RELEASE',
        releaseStatus: 'RELEASE',
        version: '1.0.2',
      },
      {
        id: 3,
        uuid: 3,
        name: '研发项目列表',
        api: '/rd/project/list',
        type: 'RPC',
        status: 'DEV',
        releaseStatus: 'DEV',
        version: '1.0.2',
      },
      {
        id: 4,
        uuid: 4,
        name: '研发项目详情',
        api: '/rd/project/desc',
        type: 'API',
        status: 'TEST',
        releaseStatus: 'TEST',
        version: '1.0.2',
      },
      {
        id: 5,
        uuid: 5,
        name: '研发项目列表',
        api: 'ProjectService#getList',
        type: 'RPC',
        status: 'DEV',
        releaseStatus: 'DEV',
        version: '1.0.2',
      },
      {
        id: 6,
        uuid: 6,
        name: '研发项目详情',
        api: '/rd/project/desc',
        type: 'API',
        status: 'DEV',
        releaseStatus: 'DEV',
        version: '1.0.2',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};


const getProjectModelList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      {
        id: 1,
        uuid: 1,
        name: '项目修改',
        className: 'ProjectCmd',
        type: 'CMD',
        status: 'RELEASE',
        version: '1.0.2',
      },
      {
        id: 2,
        uuid: 2,
        name: '项目删除',
        className: 'ProjectDelCmd',
        type: 'CMD',
        status: 'RELEASE',
        version: '1.0.2',
      },
      {
        id: 3,
        uuid: 3,
        name: '项目查询',
        className: 'ProjectQry',
        type: 'QRY',
        status: 'RELEASE',
        version: '1.0.2',
      },
      {
        id: 4,
        uuid: 4,
        name: '仓库修改',
        className: 'WarehouseCmd',
        type: 'CMD',
        status: 'RELEASE',
        version: '1.0.2',
      },
      {
        id: 5,
        uuid: 5,
        name: '成员修改',
        className: 'MemberCmd',
        type: 'CMD',
        status: 'RELEASE',
        version: '1.0.2',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getProjectWarehouseList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      {
        id: 1,
        name: '研发中心客户端',
        enname: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: '1.0.2',
      },
      {
        id: 2,
        name: '研发中心客户端',
        enname: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: '1.0.1',
      },
      {
        id: 3,
        name: '研发中心客户端',
        enname: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: '1.0.0',
      },
      {
        id: 4,
        name: '研发中心服务',
        enname: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: '1.0.2',
      },
      {
        id: 5,
        name: '研发中心服务',
        enname: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: '1.0.1',
      },
      {
        id: 6,
        name: '研发中心服务',
        enname: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: '1.0.0',
      },
      {
        id: 7,
        name: '研发中心控制台',
        enname: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: '1.0.2',
      },
      {
        id: 8,
        name: '研发中心控制台',
        enname: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: '1.0.1',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};


const getProjectVersionList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      {
        id: 1,
        name: '研发中心客户端',
        enname: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: '1.0.2',
      },
      {
        id: 2,
        name: '研发中心客户端',
        enname: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: '1.0.1',
      },
      {
        id: 3,
        name: '研发中心客户端',
        enname: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: '1.0.0',
      },
      {
        id: 4,
        name: '研发中心服务',
        enname: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: '1.0.2',
      },
      {
        id: 5,
        name: '研发中心服务',
        enname: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: '1.0.1',
      },
      {
        id: 6,
        name: '研发中心服务',
        enname: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: '1.0.0',
      },
      {
        id: 7,
        name: '研发中心控制台',
        enname: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: '1.0.2',
      },
      {
        id: 8,
        name: '研发中心控制台',
        enname: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: '1.0.1',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};


const getProjectServiceReleaseCount = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      all: 10,
      api: 9,
      rpc: 1,
      release: 10,
      edit: 2,
      processing: 1,
      reject: 2,
    },
  });
};

const getProjectVersionData = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      all: 10,
      service: 3,
      page: 1,
      console: 2,
      assembly: 3,
      client: 1
    },
  });
};

const getProjectModelReleaseCount = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      release: 10,
      edit: 2,
      processing: 1,
      reject: 2,
    },
  });
};

const getProjectModelFieldSelect = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      'ProjectCmd',
      'ProjectModelCmd',
      'ProjectVersionCmd',
      'ProjectWarehouseCmd',
      'ProjectMemberCmd',
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getProjectServiceDomainSelect = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 50,
    pageSize: 20,
    pageIndex: 1,
    data: [
      'Project',
      'ProjectModel',
      'ProjectVersion',
      'ProjectWarehouse',
      'ProjectMember',
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getProjectServiceDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      "name": "获取项目列表",
      "method": "list",
      "control": "Project",
      "domain": "Project",
      "uri": "/list/{uuid}",
      "requestType": "GET",
      "behavior": "QRY",
      "identifier": "list",
      "description": "查询项目列表",
      "requestParams": [
        {
          "fieldType": "String",
          "generic": "PATH_VARIABLE",
          "fieldName": "uuid",
          "explain": "uuid",
          "mock": "1234",
          "rule": "{}"
        },
        {
          "fieldType": "String",
          "generic": "NONE",
          "fieldName": "name",
          "explain": "项目英文名",
          "nonNull": false
        }
      ],
      "requestBodys": [
        {
          "fieldType": "String",
          "generic": "NONE",
          "fieldName": "token",
          "explain": "口令",
          "nonNull": true
        }
      ],
      "responses": [
        {
          "fieldType": "String",
          "generic": "List",
          "fieldName": "name",
          "explain": "名称"
        }
      ]
    },
  });
};

const getProjectModelDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      "name": "项目模型",
      "enname": "Axxx",
      "description": "xxxx",
      "fields": [
        {
          "fieldType": "String",
          "generic": "NONE",
          "fieldName": "name",
          "explain": "名称",
          "rule": "{}",
          "mock": "xxx",
          "nonNull": true
        }
      ]
    }
  });
};

const saveProjectService = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const saveProjectModel = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};


export default {
  'GET /api/rd/project/list': getProjectList,
  'GET /api/rd/service/list/*': getProjectServiceList,
  'GET /api/rd/service/release/count/*': getProjectServiceReleaseCount,
  'GET /api/rd/service/details/*': getProjectServiceDetails,
  'GET /api/rd/service/domain/select/*': getProjectServiceDomainSelect,
  'POST /api/rd/service/save': saveProjectService,
  'GET /api/rd/model/list/*': getProjectModelList,
  'GET /api/rd/model/release/count/*': getProjectModelReleaseCount,
  'GET /api/rd/model/details/*': getProjectModelDetails,
  'GET /api/rd/model/select/*': getProjectModelFieldSelect,
  'POST /api/rd/model/save': saveProjectModel,
  'GET /api/rd/warehouse/list/*': getProjectWarehouseList,
  'GET /api/rd/version/list/*': getProjectVersionList,
  'GET /api/rd/version/count/*': getProjectVersionData,
  'GET /api/rd/project/details/*': getProjectDetails,
  'POST /api/rd/project/save': saveProject,
  'DELETE /api/rd/project/delete/*': deleteProject,
};
