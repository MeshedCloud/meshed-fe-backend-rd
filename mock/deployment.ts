import {Request, Response} from 'express';

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
        name: '研发平台客户端',
        repoName: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 2,
        name: '研发平台客户端',
        repoName: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 3,
        name: '研发平台客户端',
        repoName: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 4,
        name: '研发平台服务',
        repoName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10002,
      },
      {
        id: 5,
        name: '研发平台服务',
        repoName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10001,
      },
      {
        id: 6,
        name: '研发平台服务',
        repoName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 7,
        name: '研发平台控制台',
        repoName: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 8,
        name: '研发平台控制台',
        repoName: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: 10000,
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
        name: '研发平台客户端',
        versionName: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 2,
        name: '研发平台客户端',
        versionName: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 3,
        name: '研发平台客户端',
        versionName: 'meshed-cloud-rd-client',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 4,
        name: '研发平台服务',
        versionName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 5,
        name: '研发平台服务',
        versionName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 6,
        name: '研发平台服务',
        versionName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 7,
        name: '研发平台控制台',
        versionName: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 8,
        name: '研发平台控制台',
        versionName: 'meshed-cloud-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: 10000,
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
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


export default {
  'GET /api/rd/warehouse/list/*': getProjectWarehouseList,
  'GET /api/rd/version/list/*': getProjectVersionList,
  'GET /api/rd/version/count/*': getProjectVersionData,
};
