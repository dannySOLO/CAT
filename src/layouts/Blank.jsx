
import React from 'react';
import { Layout } from 'antd';

import styles from './layout.module.scss';

const { Content } = Layout;

const Blank = ({ children }) => (
  <Layout className={styles.blank}>
    <Content>{children}</Content>
  </Layout>
);

export default Blank;
