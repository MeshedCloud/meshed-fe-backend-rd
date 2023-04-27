export const domainList: string[] = [
  '服务'
]

//服务/模型可编辑操作类型
export const OperateEditable = ['NEW', 'COPY']

export const OperateTypes = {
  EDIT: {
    color: '#2db7f5',
    text: '编辑',
    readonly: false
  },
  NEW: {
    color: '#677eec',
    text: '创建',
    readonly: false
  },
  READ: {
    color: '#5BD8A6',
    text: '查看',
    readonly: true
  },
  COPY: {
    color: '#05a2c5',
    text: '拷贝',
    readonly: false
  },

}

export const ReleaseStatus = {

  RELEASE: {
    color: '#2db7f5',
    text: '发行版'
  },
  SNAPSHOT: {
    color: '#677eec',
    text: '快照版本'
  },
  EDIT: {
    color: '#5BD8A6',
    text: '编辑中'
  },
  PROCESSING: {
    color: '#0a97ce',
    text: '待发布'
  },
  DISCARD: {
    color: '#e15d5d',
    text: '废弃'
  },

}
