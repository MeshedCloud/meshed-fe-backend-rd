import React from 'react';

import {Button, Popconfirm, Tooltip} from "antd";
import {TooltipPlacement} from "antd/lib/tooltip";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {ButtonType} from "antd/lib/button/button";

export type ConfirmButtonProps = {
  label?: string
  hint?: string
  hidden?: boolean | undefined
  tip?: string
  tipPlacement?: TooltipPlacement
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void
  okText?: string
  cancelText?: string
  size?: SizeType
  type?: ButtonType
  icon?: React.ReactNode
};

const ConfirmButton: React.FC<ConfirmButtonProps> = (
  {
    label, hint, hidden, tip, tipPlacement,
    type, size, icon,
    okText, cancelText, onConfirm
  }) => (
  <Popconfirm title={hint ? hint : "确定执行此操作"} okText={okText ? okText : "确定"}
              cancelText={cancelText ? cancelText : "取消"} onConfirm={onConfirm}>
    <Tooltip placement={tipPlacement ? tipPlacement : "top"} title={tip}>
      <Button hidden={hidden ? hidden : false} size={size} type={type} icon={icon}>{label}</Button>
    </Tooltip>
  </Popconfirm>
);

export default ConfirmButton;
