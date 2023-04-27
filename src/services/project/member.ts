export class Member {
  id!: number;
  name!: number;
  email?: string;
  phone?: string;
  disabled?: boolean;
}

export class MemberCmd {
  userIds!: string[];
}

export class ProjectMember {
  id!: number;
  name!: number;
  projectRole!: string;
}

export class ProjectMemberCmd {
  memberIds!: string[];
  projectKey!: string;
  projectRole!: string;
}

export const ProjectRoles = {

  VISITOR: {
    color: '#2db7f5',
    text: '访客',
    key: 'VISITOR',
  },
  DEVELOPER: {
    color: '#5BD8A6',
    text: '开发者',
    key: 'DEVELOPER',
  },
  ADMIN: {
    color: '#f50',
    text: '管理员',
    key: 'ADMIN',
  },

}
export const ProjectRoleEnum = {
  VISITOR: '访客',
  DEVELOPER: '开发者',
  ADMIN: '管理员',
}
