import _ from 'lodash';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const {currentUser} = initialState ?? {};
  const mode = localStorage.getItem('mode');
  return {
    canAdmin: mode === 'base' ? true : currentUser && currentUser.grantedRole && currentUser.grantedRole?.length > 0 && _.intersection(currentUser.grantedRole, ['RD:ADMIN']).length > 0,
    canDevelop: mode === 'base' ? true : currentUser && currentUser.grantedRole && currentUser.grantedRole?.length > 0 && _.intersection(currentUser.grantedRole, ['RD:ADMIN', 'RD:DEVELOPER', 'RD:MANAGE']).length > 0,
    canManage: currentUser && currentUser.grantedRole && currentUser.grantedRole?.length > 0 && _.intersection(currentUser.grantedRole, ['RD:ADMIN', 'RD:MANAGE']).length > 0,

  };
}
