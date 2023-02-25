export class PageInfo<T> {
  data?: T[];
  /** 列表的内容总数 */
  total?: number;
  success!: boolean;
  empty?: boolean;
  errCode?: string;
  errMessage?: string;
  notEmpty?: boolean;
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
}

export class Response<T> {
  data?: T;
  /** 列表的内容总数 */
  success!: boolean;
  errCode?: string;
  errMessage?: string;
}

export class CommonItem {
  id!: number;
  status?: string;
  created?: string;
  updated?: string;
}

export type PageParams = {
  // query
  /** 当前的页码 */
  current: number;
  /** 页面的容量 */
  pageSize?: number;
};

export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const CommonStatus = [
  {
    value: 'VALID',
    label: '正常',
  },
  {
    value: 'INVALID',
    label: '禁用',
  },
];

export const CommonStatusEnum = {
  VALID: {text: '正常', status: 'Success'},
  INVALID: {text: '失效', status: 'Default'},
};
