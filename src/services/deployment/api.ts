import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import type {Version, VersionCount} from "@/services/deployment/version";
import type {Warehouse} from "@/services/deployment/warehouse";


/** 获取项目版本列表 GET /api/iam/project/version/list/:projectKey */
export async function getProjectVersionList(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<Version>(`/api/rd/version/list/${projectKey}`, <PageParams>params, options);
}

/** 获取项目版本统计 GET /api/iam/project/version/count/:projectKey */
export async function getProjectVersionCount(projectKey: string, params: {}, options?: Record<string, any>) {
  if (projectKey == undefined || projectKey == '') return undefined;
  return await Request.get<VersionCount>(`/api/rd/version/count/${projectKey}`, params, options);
}

/** 获取项目仓库列表 GET /api/iam/project/warehouse/list */
export async function getProjectWarehouseList(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<Warehouse>(`/api/rd/warehouse/list/${projectKey}`, <PageParams>params, options);
}
