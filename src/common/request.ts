import {request} from '@@/exports';
import {Method, PageInfo, PageParams, Response} from '@/common/models';
import {Convert, Struct, toTree} from '@/common/tree';

export class Request {
  static async getPage<T>(uri: string, params: PageParams & {}, options?: { [key: string]: any }) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    return response;
  }

  static async getList<T>(uri: string, params: {}, options?: { [key: string]: any }) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    return response;
  }

  static async get<T>(uri: string, params: {}, options?: { [key: string]: any }) {
    return await request<Response<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }

  static async getTree<T>(
    uri: string,
    struct: Struct,
    params?: {},
    convert?: Convert,
    needParent?: boolean,
    options?: { [key: string]: any },
  ) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    response.data = toTree(response.data, struct, convert, needParent);
    return response;
  }

  static async getConvertNeedParentTree<T>(
    uri: string,
    params?: {},
    convert?: Convert,
    options?: { [key: string]: any },
  ) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
      parentNode: 'parent',
    };
    return this.getTree<T>(uri, struct, params, convert, true, options);
  }

  static async getConvertTree<T>(
    uri: string,
    params?: {},
    convert?: Convert,
    options?: { [key: string]: any },
  ) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
      parentNode: 'parent',
    };
    return this.getTree<T>(uri, struct, params, convert, false, options);
  }

  static async getDefaultTree<T>(uri: string, params: {}, options?: { [key: string]: any }) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
      parentNode: 'parent',
    };
    return this.getTree<T>(uri, struct, params, undefined, false, options);
  }

  static async post<T>(uri: string, data?: {}, options?: { [key: string]: any }) {
    return await request<Response<T>>(uri, {
      method: Method.POST,
      data,
      ...(options || {}),
    });
  }

  static async put<T>(uri: string, options?: { [key: string]: any }) {
    return await request<Response<T>>(uri, {
      method: Method.PUT,
      ...(options || {}),
    });
  }

  static async delete<T>(uri: string, options?: { [key: string]: any }) {
    return await request<Response<T>>(uri, {
      method: Method.DELETE,
      ...(options || {}),
    });
  }
}

export async function getData<T>(response: Response<T> | undefined, check: boolean, obj: T) {
  return check && response && response.success && response.data ? response.data : obj;
}

export async function getListData<T>(response: Response<T> | undefined, check: boolean, obj: T) {
  return check && response && response.success && response.data ? response.data : obj;
}
