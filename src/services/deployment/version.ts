export class Version {
  id!: number;
  name: number | undefined;
  enname: number | undefined;
  version: string | undefined;
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
