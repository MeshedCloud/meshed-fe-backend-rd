import _ from "lodash";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const {currentUser} = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.grantedRole && currentUser.grantedRole?.length > 0 && _.intersection(currentUser.grantedRole, ['RD:ADMIN']).length > 0,
    canDevelop: currentUser && currentUser.grantedRole && currentUser.grantedRole?.length > 0 && _.intersection(currentUser.grantedRole, ['RD:ADMIN', 'RD:DEVELOPER', 'RD:MANAGE']).length > 0,
  };
}
