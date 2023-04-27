import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import type {Project, ProjectDetail} from "@/services/project/project";
import {ProjectCmd, Trend} from "@/services/project/project";
import type {
  ProjectModel,
  ProjectModelCount,
  ProjectModelDetails,
  ProjectService,
  ProjectServiceCount,
  ProjectServiceDetails,
} from "@/services/project/serviceModel";
import {ProjectServiceGroup} from "@/services/project/serviceModel";
import {Member, MemberCmd, ProjectMember, ProjectMemberCmd} from "@/services/project/member";

/**
 * ==========项目===========
 */

/** 获取规则列表 GET /api/iam/project/list */
export async function getProjectList(params: {}, options?: Record<string, any>) {
  if (params['type'] && params['type'].toUpperCase() === "ALL") {
    delete params['type']
  }
  return await Request.getPage<Project>('/api/rd/project/list', <PageParams>params, options);
}

/** 获取规则列表 GET /api/project/details */
export async function getProjectDetails(projectKey: string, params?: {}, options?: Record<string, any>) {
  if (projectKey === undefined) {
    return undefined;
  }
  return Request.get<ProjectDetail>(`/api/rd/project/details/${projectKey}`, params ? params : {}, options);
}

/** 保存（新增和更新）账号 POST /api/project/save */
export async function saveProject(data: ProjectCmd) {
  return Request.put('/api/rd/project/apply', data);
}

/** 删除账号 DELETE /api/project/delete */
export async function deleteProject(id: string, options?: Record<string, any>) {
  if (id === undefined) {
    return undefined;
  }
  return Request.delete<any>(`/api/rd/project/delete/${id}`, options);
}


/**
 * ==========服务分组===========
 */
/** 获取服务分组选项 GET /api/iam/service/group/select/:projectKey */
export async function getProjectServiceGroupSelect(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getList<ProjectServiceGroup>(`/api/rd/service/group/select/${projectKey}`, <PageParams>params, options);
}

/** 保存服务接口 POST /api/project/service/save */
export async function saveProjectServiceGroup(data: ProjectServiceGroup) {
  return Request.post<ProjectServiceGroup>('/api/rd/service/group/save', data);
}

/**
 * ==========服务===========
 */


/** 获取项目服务列表 GET /api/iam/project/service/list/:projectKey */
export async function getProjectServiceList(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<ProjectService>(`/api/rd/service/list/${projectKey}`, <PageParams>params, options);
}

/** 获取项目服务详情 GET /api/iam/project/service/details/:projectKey */
export async function getProjectServiceDetails(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.get<ProjectServiceDetails>(`/api/rd/service/details/${uuid}`, params, options);
}

/** 保存服务接口 POST /api/project/service/save */
export async function saveProjectService(data: ProjectServiceDetails) {
  return Request.post('/api/rd/service/save', data);
}

/** 获取项目服务统计 GET /api/iam/project/service/count/:projectKey */
export async function getProjectServiceReleaseCount(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.get<ProjectServiceCount>(`/api/rd/service/release/count/${projectKey}`, params, options);
}

/** 完成服务 POST /api/iam/project/service/complete/:uuid */
export async function completeProjectService(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.post<any>(`/api/rd/service/complete/${uuid}`, params, options);
}

/** 撤销服务 POST /api/iam/project/service/revoke/:uuid */
export async function revokeProjectService(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.post<any>(`/api/rd/service/revoke/${uuid}`, params, options);
}

/** 废弃服务 POST /api/iam/project/service/discard/:uuid */
export async function discardProjectService(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.post<any>(`/api/rd/service/discard/${uuid}`, params, options);
}

/** 删除服务 DELETE /api/iam/project/service/delete/:uuid */
export async function deleteProjectService(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.delete<any>(`/api/rd/service/delete/${uuid}`, params, options);
}

/**
 * ==========领域===========
 */


/** 获取项目服务领域的选项 GET /api/iam/project/service/domain/select/:projectKey */
export async function getProjectDomainSelect(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.get<string[]>(`/api/rd/domain/select/${projectKey}`, params, options);
}

export async function saveProjectDomain(data: { projectKey: string, key: string }, options?: Record<string, any>) {
  return await Request.put<string[]>(`/api/rd/domain/add`, {
    projectKey: data.projectKey,
    key: data.key,
    name: data.key
  }, options);
}

/**
 * ==========模型===========
 */


/** 获取项目模型列表 GET /api/iam/project/model/list/:projectKey */
export async function getProjectModelList(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<ProjectModel>(`/api/rd/model/list/${projectKey}`, <PageParams>params, options);
}


/** 获取项目模型详情 GET /api/iam/project/model/details/:projectKey */
export async function getProjectModelDetails(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.get<ProjectModelDetails>(`/api/rd/model/details/${projectKey}`, params, options);
}


/** 获取项目模型统计 GET /api/iam/project/model/count/:projectKey */
export async function getProjectModelReleaseCount(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.get<ProjectModelCount>(`/api/rd/model/release/count/${projectKey}`, params, options);
}

/** 获取项目模型字段选择 GET /api/iam/project/model/field/select/:projectKey */
export async function getProjectModelSelect(projectKey: string, params: {}, options?: Record<string, any>) {
  return await Request.get<string[]>(`/api/rd/model/select/${projectKey}`, params, options);
}

/** 保存服务模型 POST /api/project/model/save */
export async function saveProjectModel(data: ProjectServiceDetails) {
  return Request.post('/api/rd/model/save', data);
}

/** 完成模型 GET /api/iam/project/model/complete/:uuid */
export async function completeProjectModel(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.post(`/api/rd/model/complete/${uuid}`, params, options);
}

/** 撤销模型 GET /api/iam/project/model/revoke/:uuid */
export async function revokeProjectModel(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.post(`/api/rd/model/revoke/${uuid}`, params, options);
}

/** 废弃模型 POST /api/iam/project/model/discard/:uuid */
export async function discardProjectModel(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.post<any>(`/api/rd/model/discard/${uuid}`, params, options);
}

/** 删除模型 DELETE /api/iam/project/model/delete/:uuid */
export async function deleteProjectModel(uuid: string, params: {}, options?: Record<string, any>) {
  return await Request.delete<any>(`/api/rd/model/delete/${uuid}`, params, options);
}

/**
 * ==========成员===========
 */

/** 获取成员列表 GET /api/iam/project/member/list */
export async function getMemberList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<Member>(`/api/rd/member/list`, <PageParams>params, options);
}

/** 获取成员列表 GET /api/iam/project/member/list */
export async function getImportMemberList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<Member>(`/api/rd/member/import/list`, <PageParams>params, options);
}

/** 添加成员 PUT /api/project/member/add */
export async function saveMember(data: MemberCmd) {
  return Request.put('/api/rd/member/add', data);
}

/** 删除成员 DELETE /api/rd/member/delete/${id} */
export async function deleteMember(id: number) {
  return Request.delete(`/api/rd/member/delete/${id}`);
}

/**
 * =========项目成员==========
 */

/** 获取项目成员列表 GET /api/iam/project/member/list */
export async function getProjectMemberList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<ProjectMember>(`/api/rd/project/member/list`, <PageParams>params, options);
}

/** 添加项目成员 PUT /api/project/member/add */
export async function saveProjectMember(data: ProjectMemberCmd) {
  return Request.put('/api/rd/project/member/add', data);
}

/** 删除项目成员 DELETE /api/rd/project/member/delete/${id} */
export async function deleteProjectMember(id: number) {
  return Request.delete(`/api/rd/project/member/delete/${id}`);
}

/**
 * =========项目动态==========
 */

/** 获取项目成员列表 GET /api/iam/trend/list */
export async function getProjectTrendList(projectKey: string, params?: {}, options?: Record<string, any>) {
  return await Request.getPage<Trend>(`/api/rd/trend/list/${projectKey}`, <PageParams>params, options);
}
