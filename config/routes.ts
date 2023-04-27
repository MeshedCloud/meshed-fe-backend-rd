export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  // {path: '/workbench', name: '研发工作台', icon: 'smile', component: './Workbench'},
  {name: '研发项目', icon: 'CodeSandboxOutlined', path: '/project', component: './Project'},
  {name: '发起立项', icon: 'CodeSandboxOutlined', path: '/project/create', hideInMenu: true, component: './Project/Create'},
  {
    name: '发起结果',
    icon: 'CodeSandboxOutlined',
    path: '/project/create/:result',
    hideInMenu: true,
    component: './Project/Create/CreateResult'
  },
  {
    name: '项目详情',
    icon: 'CodeSandboxOutlined',
    path: '/project/details/:projectKey',
    hideInMenu: true,
    component: './Project/Details'
  },
  {
    name: '服务',
    icon: 'CodeSandboxOutlined',
    path: '/project/service/:projectKey/:operate/:groupId/:uuid',
    hideInMenu: true,
    component: './Project/Service'
  },
  {
    name: '模型',
    icon: 'CodeSandboxOutlined',
    path: '/project/model/:projectKey/:type/:operate/:uuid',
    hideInMenu: true,
    component: './Project/Model'
  },
  {name: '组件库', icon: 'CloudServerOutlined', path: '/packages', component: './Packages'},
  {name: '成员管理', icon: 'TeamOutlined', path: '/members', component: './Member'},
  // {name: '研发配置', icon: 'SettingOutlined', path: '/list', component: './Project'},
  {path: '/', redirect: '/project'},
  {path: '/error/:code', layout: false, component: './error'},
  {path: '*', redirect: '/error/404'},
];
