import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import type {Version} from "@/services/deployment/version";
import {VersionCmd} from "@/services/deployment/version";
import type {Warehouse} from "@/services/deployment/warehouse";
import {WarehouseCmd} from "@/services/deployment/warehouse";
import {Packages, PackagesCmd} from "@/services/deployment/packages";

/** 获取项目仓库列表 GET /api/iam/project/warehouse/list */
export async function getProjectWarehouseList(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<Warehouse>(`/api/rd/warehouse/list/${projectKey}`, <PageParams>params, options);
}

/** 保存服务模型 POST /api/warehouse/save */
export async function saveProjectWarehouse(data: WarehouseCmd) {
  return Request.post('/api/rd/warehouse/add', data);
}

/** 获取项目模型字段选择 GET /api/rd/warehouse/field/select/:projectKey */
export async function getProjectWarehouseSelect(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.get<Warehouse[]>(`/api/rd/warehouse/select/${projectKey}`, params, options);
}


/** 获取项目版本列表 GET /api/iam/project/version/list/:projectKey */
export async function getProjectVersionList(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<Version>(`/api/rd/version/list/${projectKey}`, <PageParams>params, options);
}

/** 保存服务模型 POST /api/warehouse/publish */
export async function publishProjectVersion(data: VersionCmd) {
  return Request.post('/api/rd/version/publish', data);
}

/** 获取项目制品库列表 GET /api/iam/packages/list/:projectKey */
export async function getPackagesList(params: { projectKey?: string }, options?: Record<string, any>) {
  return await Request.getPage<Packages>(`/api/rd/packages/list`, <PageParams>params, options);
}

/** 获取项目制品库列表 GET /api/iam/packages/save */
export async function savePackagesList(data: PackagesCmd) {
  return await Request.put(`/api/rd/packages/save`, data);
}
