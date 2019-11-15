import React from 'react';
import { PageHeader, Card } from 'antd';
import styles from './Container.module.scss';
import MainLayout from 'layouts/Main';

const Container = ({ children, title }) => {
  const header = <PageHeader title={title} />;
  return (
    <MainLayout header={header}>
      <Card className={styles.dashboard} bordered={false}>
        {children}
      </Card>
    </MainLayout>
  );
};

export default Container;
