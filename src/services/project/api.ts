import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {Project, ProjectDetail} from "@/services/project/project";
import {ProjectService, ProjectServiceCount, ProjectServiceDetails,} from "@/services/project/service";
import {ProjectModel, ProjectModelCount, ProjectModelDetails,} from "@/services/project/serviceModel";

/** 获取规则列表 GET /api/iam/project/list */
export async function getProjectList(params: {}, options?: { [key: string]: any }) {
  return await Request.getPage<Project>('/api/rd/project/list', <PageParams>params, options);
}

/** 获取规则列表 GET /api/project/details */
export async function getProjectDetails(projectKey: string, params?: {}, options?: { [key: string]: any }) {
  if (projectKey === undefined) {
    return undefined;
  }
  return Request.get<ProjectDetail>(`/api/rd/project/details/${projectKey}`, params ? params : {}, options);
}

/** 保存（新增和更新）账号 POST /api/project/save */
export async function saveProject(data: ProjectDetail) {
  return Request.post('/api/rd/project/save', data);
}

/** 删除账号 DELETE /api/project/delete */
export async function deleteProject(id: number, options?: { [key: string]: any }) {
  if (id === undefined) {
    return undefined;
  }
  return Request.delete<any>(`/api/rd/project/delete/${id}`, options);
}

/** 获取项目服务列表 GET /api/iam/project/service/list/:projectKey */
export async function getProjectServiceList(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.getPage<ProjectService>(`/api/rd/project/service/list/${projectKey}`, <PageParams>params, options);
}

/** 获取项目服务详情 GET /api/iam/project/service/details/:projectKey */
export async function getProjectServiceDetails(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.get<ProjectServiceDetails>(`/api/rd/project/service/details/${projectKey}`, params, options);
}

/** 保存服务接口 POST /api/project/service/save */
export async function saveProjectService(data: ProjectServiceDetails) {
  return Request.post('/api/rd/project/service/save', data);
}

/** 获取项目服务统计 GET /api/iam/project/service/count/:projectKey */
export async function getProjectServiceCount(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.get<ProjectServiceCount>(`/api/rd/project/service/count/${projectKey}`, params, options);
}

/** 获取项目服务领域的选项 GET /api/iam/project/service/domain/select/:projectKey */
export async function getProjectServiceDomainSelect(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.get<string[]>(`/api/rd/project/service/domain/select/${projectKey}`, params, options);
}

/** 获取项目模型列表 GET /api/iam/project/model/list/:projectKey */
export async function getProjectModelList(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.getPage<ProjectModel>(`/api/rd/project/model/list/${projectKey}`, <PageParams>params, options);
}


/** 获取项目模型详情 GET /api/iam/project/model/details/:projectKey */
export async function getProjectModelDetails(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.get<ProjectModelDetails>(`/api/rd/project/model/details/${projectKey}`, params, options);
}


/** 获取项目模型统计 GET /api/iam/project/model/count/:projectKey */
export async function getProjectModelCount(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.get<ProjectModelCount>(`/api/rd/project/model/count/${projectKey}`, params, options);
}

/** 获取项目模型字段选择 GET /api/iam/project/model/field/select/:projectKey */
export async function getProjectModelFieldSelect(projectKey: string, params: {}, options?: { [key: string]: any }) {
  return await Request.get<string[]>(`/api/rd/project/model/field/select/${projectKey}`, params, options);
}

/** 保存服务模型 POST /api/project/model/save */
export async function saveProjectModel(data: ProjectServiceDetails) {
  return Request.post('/api/rd/project/model/save', data);
}
