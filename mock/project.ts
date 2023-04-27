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
      version: 10000,
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
    totalCount: 2,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        uuid: 1,
        name: '研发项目列表',
        uri: '/rd/project/list',
        type: 'API',
        requestType: 'GET',
        status: 'DEV',
        releaseStatus: 'DEV',
        version: 10000,
      },
      {
        id: 2,
        uuid: 2,
        name: '研发项目列表',
        uri: 'ProjectRpc#list',
        type: 'RPC',
        requestType: 'RPC',
        status: 'DEV',
        releaseStatus: 'DEV',
        version: 10000,
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
    totalCount: 2,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        uuid: 1,
        name: '项目修改',
        className: 'ProjectCmd',
        type: 'COMMAND',
        status: 'RELEASE',
        version: 10000,
      },
      {
        id: 2,
        uuid: 2,
        name: '项目删除',
        className: 'ProjectDelCmd',
        type: 'COMMAND',
        status: 'RELEASE',
        version: 10000,
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
      "key": "Axxx",
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

const completeProjectService = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};


const revokeProjectService = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const discardProjectService = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const deleteProjectService = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};


const saveProjectModel = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const completeProjectModel = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};


const revokeProjectModel = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const discardProjectModel = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const deleteProjectModel = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const getMemberList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 2,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        name: '李四',
        phone: '18888888888',
        email: '11@qq.com',

      },
      {
        id: 2,
        name: '王五',
        phone: '18888888888',
        email: '11@qq.com',
      },
      {
        id: 3,
        name: '张帅',
        phone: '18888888888',
        email: '11@qq.com',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getImportMemberList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 22,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        disabled: true,
        name: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 2,
        realName: 'admin',
        loginId: 'user',
        phone: '18888888881',
        email: '12@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 3,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 4,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 5,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: true,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 6,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 7,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 8,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 9,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 10,
        realName: 'admin',
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
    ],
    notEmpty: true,
    totalPages: 2,
    empty: false,
  });
};

const saveMember = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const deleteMember = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const getProjectMemberList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 2,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        name: '李四',
        projectRole: 'ADMIN',
      },
      {
        id: 2,
        name: '王五',
        projectRole: 'VISITOR',
      },
      {
        id: 3,
        name: '张帅',
        projectRole: 'DEVELOPER',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const saveProjectMember = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const deleteProjectMember = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};
// ============== 动态 ==================================

const getProjectTrendList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 2,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        level: "INFO",
        message: '版本发布',
        time: 1681385214695,
      },
      {
        level: "ERROR",
        message: '仓库初始化',
        time: 1681385214695,
      },
      {
        level: "INFO",
        message: '仓库创建',
        time: 1681385214695,
      },
      {
        level: "ERROR",
        message: '项目创建',
        time: 1681385214695,
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

export default {
  'GET /api/rd/project/list': getProjectList,
  'GET /api/rd/service/list/*': getProjectServiceList,
  'GET /api/rd/service/release/count/*': getProjectServiceReleaseCount,
  'GET /api/rd/service/details/*': getProjectServiceDetails,
  'GET /api/rd/service/domain/select/*': getProjectServiceDomainSelect,
  'POST /api/rd/service/save': saveProjectService,
  'POST /api/rd/service/complete/**': completeProjectService,
  'POST /api/rd/service/revoke/**': revokeProjectService,
  'DELETE /api/rd/service/discard/**': discardProjectService,
  'DELETE /api/rd/service/delete/**': deleteProjectService,
  'GET /api/rd/model/list/*': getProjectModelList,
  'GET /api/rd/model/release/count/*': getProjectModelReleaseCount,
  'GET /api/rd/model/details/*': getProjectModelDetails,
  'GET /api/rd/model/select/*': getProjectModelFieldSelect,
  'POST /api/rd/model/save': saveProjectModel,
  'POST /api/rd/model/complete/**': completeProjectModel,
  'POST /api/rd/model/revoke/**': revokeProjectModel,
  'DELETE /api/rd/model/discard/**': discardProjectModel,
  'DELETE /api/rd/model/delete/**': deleteProjectModel,
  'GET /api/rd/project/details/*': getProjectDetails,
  'POST /api/rd/project/save': saveProject,
  'DELETE /api/rd/project/delete/*': deleteProject,
  'GET /api/rd/member/list': getMemberList,
  'GET /api/rd/member/import/list': getImportMemberList,
  'PUT /api/rd/member/save': saveMember,
  'DELETE /api/rd/member/delete/*': deleteMember,
  'GET /api/rd/project/member/list': getProjectMemberList,
  'PUT /api/rd/project/member/save': saveProjectMember,
  'DELETE /api/rd/project/member/delete/*': deleteProjectMember,
  'GET /api/rd/trend/list/*': getProjectTrendList,
};
