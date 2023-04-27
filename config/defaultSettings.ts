import {Settings as LayoutSettings} from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // headerRender: false,
  // menuRender: false,
  // menuHeaderRender: false,
  // footerRender: false,
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '研发平台',
  pwa: false,
  logo: 'https://s.meshed.cn/meshed/svg/logo.svg',
  iconfontUrl: '',
};

/**
 * @name
 */
const BaseSettings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  headerRender: false,
  menuRender: false,
  menuHeaderRender: false,
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '研发平台',
  pwa: false,
  logo: 'https://s.meshed.cn/meshed/svg/logo.svg',
  iconfontUrl: '',
};

export default {
  BaseSettings, Settings
}
