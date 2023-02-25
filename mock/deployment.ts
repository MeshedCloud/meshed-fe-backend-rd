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
