import {CheckCard, ModalForm, ProForm, ProFormGroup,} from '@ant-design/pro-components';
import {Button, Form} from 'antd';

import React from "react";

type Props = {
  title: React.ReactNode | string;
  action: React.ReactNode | string;
  data: any,
  defaultValue: string,
  onFinish: (value: number | undefined) => void;
};


export class CheckCardForm {
  value?: number
}

export default (props: Props) => {
  const [form] = Form.useForm<CheckCardForm>();

  return (
    <ModalForm<CheckCardForm>
      title={props.title}
      trigger={
        <Button type="primary">
          {props.title}
        </Button>
      }
      initialValues={{
        value: props.defaultValue,
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (value) => {
        console.log(value)
        props.onFinish?.(value.value)
        return true;
      }}
    >
      <ProFormGroup>
        <ProForm.Item name='value' initialValue={props.defaultValue} rules={[{required: true, message: "此项必须选择"}]}>
          <CheckCard.Group
            onChange={() => {
            }}
            defaultValue={props.defaultValue}
          >
            {
              Object.keys(props.data).map(key => {
                return <CheckCard
                  key={key}
                  avatar={props.data[key].avatar}
                  title={props.data[key].text}
                  description={props.data[key].description}
                  value={key}
                />
              })
            }
          </CheckCard.Group>
        </ProForm.Item>
      </ProFormGroup>

    </ModalForm>
  );
};
