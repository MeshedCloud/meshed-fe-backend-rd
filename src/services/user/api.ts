// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';
import {Request} from '@/common/request';

/** 获取用户信息 GET /api/iam/current/userinfo */
export async function getCurrentInfo(
  options?: { [key: string]: any },
) {
  return Request.get<API.CurrentUser>('/api/iam/current/userinfo', {}, options);
}


/** 退出登录接口 POST /api/login/outLogin */
export async function logout(options?: { [key: string]: any }) {
  const res = await Request.delete<API.CurrentUser>('/api/iam/logout', {}, options);
  if (res.success) {
    localStorage.removeItem("TOKEN");
  }
  return res;
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
