import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/Main';
import { PageHeader, Row, Col, Icon, Spin } from 'antd';
import styles from './Result.module.scss';
import api from '../../services/api';

const TITLE = 'Result';
const Result = () => {
  const header = <PageHeader title={TITLE} />;
  const [result, setResult] = useState([]);
  const [init, setInit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setInit(true);
    api
      .GET('/GetResult')
      .then(res => {
        setInit(false);
        setResult(res);
      })
      .catch(e => setError(true));
  }, []);

  const getTime = ms => {
    const time = new Date(ms);
    return time.toDateString();
  };

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
              <Col span={12}>{getTime(item.startDate)}</Col>
              <Col span={10}>{item.grade}</Col>
            </Row>
          );
        })}
      </>
    );
  };

  const errorNoti = () => {
    return (
      <div className="error">
        <Icon type="exclamation-circle" />
        <br />
        Error when loading api
      </div>
    );
  };

  const initting = () => {
    const style = {
      textAlign: 'center',
      marginTop: '30vh',
    };
    return (
      <div style={style}>
        <Spin size="large" tip="Loading...!" />
      </div>
    );
  };

  return (
    <MainLayout header={header}>
      <div className={styles.result}>
        {(error && errorNoti()) || (
          <div className="container">
            {(init && initting()) || resultTable()}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Result;
