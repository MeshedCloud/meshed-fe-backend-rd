import {Request, Response} from 'express';
import {SUCCESS_RESPONSE} from "./commonMock";

const getProjectWarehouseList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 3,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        uuid: "1",
        name: '研发平台服务端',
        repoName: 'meshed-cloud-rd',
        repoUrl: 'https://github.com/meshed-cloud/meshed-cloud-rd.git',
        type: 'SERVICE',
        status: 'DEV',
        version: 10000,
      },
      {
        uuid: "2",
        name: '研发平台客户端',
        repoName: 'meshed-cloud-rd-client',
        repoUrl: 'https://github.com/meshed-cloud/meshed-cloud-rd-client.git',
        type: 'CLIENT',
        status: 'DEV',
        version: 10000,
      },
      {
        uuid: "3",
        name: '研发平台控制台',
        repoName: 'meshed-fe-backend-rd',
        repoUrl: 'https://github.com/meshed-cloud/meshed-fe-backend-rd.git',
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
    totalCount: 3,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        name: '研发平台服务端',
        versionName: 'meshed-cloud-rd',
        type: 'SERVICE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 2,
        name: '研发平台客户端',
        versionName: 'meshed-cloud-rd-client',
        type: 'CONSOLE',
        status: 'DEV',
        version: 10000,
      },
      {
        id: 3,
        name: '研发平台客户端',
        versionName: 'meshed-fe-backend-rd',
        type: 'CONSOLE',
        status: 'DEV',
        version: 10000,
      }
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

const getProjectPackagesList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 3,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        name: '研发平台客户端',
        groupId: 'cn.meshed.cloud.rd',
        artifactId: 'meshed-cloud-rd',
        type: 'MAVEN',
        version: "1.0.0",
      },
      {
        id: 2,
        name: '研发平台客户端',
        groupId: 'cn.meshed.cloud.rd',
        artifactId: 'meshed-cloud-rd',
        type: 'MAVEN',
        version: "1.0.0",
      },
      {
        id: 3,
        name: '研发平台客户端',
        groupId: 'cn.meshed.cloud.rd',
        artifactId: 'meshed-cloud-rd',
        type: 'MAVEN',
        version: "1.0.0",
      },
      {
        id: 4,
        name: '研发平台客户端',
        groupId: 'cn.meshed.cloud.rd',
        artifactId: 'meshed-cloud-rd',
        type: 'MAVEN',
        version: "1.0.0",
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const savePackages = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

export default {
  'GET /api/rd/warehouse/list/*': getProjectWarehouseList,
  'GET /api/rd/version/list/*': getProjectVersionList,
  'GET /api/rd/version/count/*': getProjectVersionData,
  'GET /api/rd/packages/list': getProjectPackagesList,
  'PUT /api/rd/packages/save': savePackages,
};
