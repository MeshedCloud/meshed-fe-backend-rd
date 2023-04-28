export class Version {
  id!: number;
  sourceId!: string;
  name: string | undefined;
  environments: string[] | undefined;
  version: number | undefined;
  type!: string;
  status!: string;
}

export class VersionCount {
  all!: number;
  service!: number;
  page!: number;
  console!: number;
  assembly!: number;
  client!: number;
}

export class VersionCmd {
  versionId?: number;
  projectKey!: string;
  environment!: string;
  version: string | undefined;
  purposeType!: string;
  warehouseId!: string;
  commitMessage!: string;
}

export const VersionTypes = {
  MAVEN: {
    color: '#2db7f5',
    text: '制品'
  },
  IMAGES: {
    color: '#87d068',
    text: '镜像'
  },
  PAGE: {
    color: '#87d068',
    text: '页面'
  },
}
export const VersionEnvironment = {
  SNAPSHOT: {
    color: '#2db7f5',
    text: '快照'
  },
  RELEASE: {
    color: '#87d068',
    text: '正式'
  },
}
export const VersionStatus = {
  SUBMIT: {
    color: '#2db7f5',
    text: '制品'
  },
  BUILDING: {
    color: '#b9d068',
    text: '构建中'
  },
  BUILD: {
    color: '#68d09c',
    text: '构建完成'
  },
  BUILD_FAILED: {
    color: '#d91818',
    text: '构建失败'
  },
  DEPLOYMENT_FAILED: {
    color: '#d91818',
    text: '部署失败'
  },
  PUBLISHED: {
    color: '#87d068',
    text: '已发布'
  },
  REJECT: {
    color: '#e15d5d',
    text: '拒绝'
  },
}

export const MavenEnvironmentOptions = [
  {
    label: '快照版本',
    value: 'SNAPSHOT',
  },
  {
    label: '正式发行',
    value: 'RELEASE',
  },
]
