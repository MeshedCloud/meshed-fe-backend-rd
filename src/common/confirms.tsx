import {Modal} from 'antd';
import * as React from 'react';
import type {LegacyButtonType} from 'antd/lib/button/button';
import {ExclamationCircleFilled} from '@ant-design/icons';

export function confirm(
  title: string,
  content: string,
  onOk?: (...args: any[]) => any,
  onCancel?: (...args: any[]) => any,
  okType?: LegacyButtonType,
  icon?: React.ReactNode,
) {
  Modal.confirm({
    title: title,
    icon: icon,
    content: content,
    okText: '确定',
    okType: okType,
    cancelText: '取消',
    onOk: onOk,
    onCancel: onCancel,
  });
}

export function confirmWarning(
  title: string,
  content: string,
  onOk?: (...args: any[]) => any,
  onCancel?: (...args: any[]) => any,
) {
  confirm(title, content, onOk, onCancel, 'danger', <ExclamationCircleFilled/>);
}
