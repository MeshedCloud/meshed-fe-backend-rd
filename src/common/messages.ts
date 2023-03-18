import type {Response} from '@/common/models';
import {message} from 'antd';

export function success(res: undefined | Response<any>, successMsg?: string) {
  if (res != undefined && res.success) {
    message.success(successMsg == undefined ? '操作成功' : successMsg);
    return true;
  }
  return false;
}


export function tips(msg: string) {
  if (msg != undefined && msg != '') {
    message.info(msg);
    return true;
  }
  return false;
}

export function errorTips(msg: string) {
  if (msg != undefined && msg != '') {
    message.error(msg);
    return true;
  }
  return false;
}
