import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/Main';
import { PageHeader } from 'antd';
import { styles } from './Result.module.scss';

const TITLE = 'Result';
const Result = () => {
  const header = <PageHeader title={TITLE} />;
  return (
    <MainLayout header={header}>
      <div className={styles.result}>
        <div className="container">hihihi</div>
      </div>
    </MainLayout>
  );
};

export default Result;
