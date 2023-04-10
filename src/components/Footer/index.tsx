import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import '@umijs/max';

const Footer: React.FC = () => {
  const defaultMessage = 'Meshed Cloud 研发中台';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{background: 'none'}}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Meshed Cloud',
          title: 'Meshed Cloud',
          href: 'https://www.meshed.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/meshed-cloud',
          blankTarget: true,
        },
        {
          key: 'Vincent Vic',
          title: 'Vincent Vic',
          href: 'https://github.com/Vincent-Vic',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
