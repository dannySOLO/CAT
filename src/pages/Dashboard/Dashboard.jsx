import React from 'react';
import { PageHeader, Card } from 'antd';

import MainLayout from 'layouts/Main';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const header = <PageHeader title="Dashboard" />;
  return (
    <MainLayout header={header}>
      <Card className={styles.dashboard} bordered={false}>
        <h3>TODO</h3>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
