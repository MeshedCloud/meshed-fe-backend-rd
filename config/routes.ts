export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  {path: '/workbench', name: '研发工作台', icon: 'smile', component: './Workbench'},
  {name: '所有项目', icon: 'CodeSandboxOutlined', path: '/project', component: './Project'},
  {name: '发起立项', icon: 'CodeSandboxOutlined', path: '/project/create', hideInMenu: true, component: './Project/Create'},
  {
    name: '项目详情',
    icon: 'CodeSandboxOutlined',
    path: '/project/details/:type/:projectKey',
    hideInMenu: true,
    component: './Project/Details'
  },
  {
    name: '服务',
    icon: 'CodeSandboxOutlined',
    path: '/project/:projectKey/service/:type/:operate/:uuid',
    hideInMenu: true,
    component: './Project/Service'
  },
  {
    name: '模型',
    icon: 'CodeSandboxOutlined',
    path: '/project/:projectKey/model/:type/:operate/:uuid',
    hideInMenu: true,
    component: './Project/Model'
  },
  {name: '成员管理', icon: 'TeamOutlined', path: '/list', component: './TableList'},
  {name: '研发配置', icon: 'SettingOutlined', path: '/list', component: './TableList'},
  {path: '/', redirect: '/workbench'},
  {path: '*', layout: false, component: './404'},
];
