export class Repo {
  uuid!: string
  repoId!: string
  name!: string
  repoName!: string
  repoType!: string
  repoUrl!: string
  purposeType!: string
  relation!: string
  version!: number
  accessMode!: string
  description!: string
  branchs!: string[]
}

export class RepoFile {
  id!: number
  name!: string
  path!: string
  type!: string
}


