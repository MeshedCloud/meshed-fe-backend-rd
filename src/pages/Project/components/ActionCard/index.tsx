import React from 'react';
import styles from './index.less';
import {Link} from "@@/exports";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const ActionCard: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  to: string

}> = ({left, right, to}) => {
  return (
    <Link to={to}>
      <div className={styles.card}>
        {left}
        {right}
      </div>
    </Link>
  );
};


export default ActionCard
