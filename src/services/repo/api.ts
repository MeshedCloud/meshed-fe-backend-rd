import {Request} from '@/common/request';

import {Repo, RepoFile} from "@/services/repo/repo";

/** 获取仓库树 GET /api/rd/repo/tree */
export async function getRepoTree(params: {}, options?: Record<string, any>) {
  return await Request.getList<RepoFile>(`/api/rd/repo/tree`, params, options);
}

/** 获取仓库详情 GET /api/rd/repo/${repoId} */
export async function getRepoDetails(repoId: string) {
  return await Request.get<Repo>(`/api/rd/repo/${repoId}`, {});
}

/** 获取仓库文件信息 GET /api/rd/repo/blob */
export async function getRepoBlob(params: {}) {
  return await Request.get<string>(`/api/rd/repo/blob`, params);
}
