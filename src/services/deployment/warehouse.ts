export class Warehouse {
  id!: number;
  name: number | undefined;
  enname: number | undefined;
  version: string | undefined;
  type!: string;
  status!: string;
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
