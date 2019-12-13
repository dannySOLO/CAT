import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/Main';
import { PageHeader, Row, Col } from 'antd';
import styles from './Result.module.scss';
import api from '../../services/api';

const TITLE = 'Result';
const Result = () => {
  const header = <PageHeader title={TITLE} />;
  const [result, setResult] = useState([]);

  useEffect(() => {
    api.GET('/GetResult').then(res => {
      setResult(res);
    });
  }, []);

  const resultTable = () => {
    return (
      <>
        <Row>
          <Col span={12} offset={2}>
            <strong>Time</strong>
          </Col>
          <Col span={10}>
            <strong>Result</strong>
          </Col>
        </Row>
        {result.map((item, index) => {
          return (
            <Row>
              <Col span={2}>{index + 1}</Col>
              <Col span={12}>{new Date(item.startDate)}</Col>
              <Col span={10}>{item.grade}</Col>
            </Row>
          );
        })}
      </>
    );
  };
  return (
    <MainLayout header={header}>
      <div className={styles.result}>
        <div className="container">{resultTable()}</div>
      </div>
    </MainLayout>
  );
};

export default Result;
