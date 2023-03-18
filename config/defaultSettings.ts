import {Settings as LayoutSettings} from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {

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
  logo: 'http://s.meshed.cn/meshed/svg/logo-no-background.svg',
  iconfontUrl: '',
};
export default Settings;
