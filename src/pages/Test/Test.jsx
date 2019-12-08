import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from 'layouts/Main';
import { Radio, Button, Icon, PageHeader, Statistic, Modal } from 'antd';

import AnswerChart from '../AnswerChart/AnswerChart';
import styles from './Test.module.scss';
import api from '../../services/api';

const TITLE = null;

const Test = () => {
  const history = useHistory();
  const [chose, setChose] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState(2);

  const dataForChart = [
    {
      id: 0,
      prediction: 5,
    },
    {
      id: 1,
      prediction: 4,
    },
    {
      id: 2,
      prediction: 6,
    },
    {
      id: 3,
      prediction: 4.5,
    },
    {
      id: 4,
      prediction: 5,
    },
    {
      id: 5,
      prediction: 5.3,
    },
    {
      id: 6,
      prediction: 5.1,
    },
    {
      id: 7,
      prediction: 5.2,
    },
  ];

  const [resModel, setResModel] = useState({});

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const handleChange = e => {
    console.log('chose: ', e.target.value);
    setChose(e.target.value);
  };

  const showQuestion = () => {
    return (
      <div>
        {resModel.idExam && (
          <div>
            <h2>
              Question {resModel.questionStt}: {resModel.contentQuestion}
            </h2>
            <Radio.Group id="ans-choose" onChange={handleChange} value={chose}>
              {resModel.answers.map(ans => (
                <Radio style={radioStyle} value={ans.idAnswer}>
                  {ans.contentAnswer}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}
      </div>
    );
  };

  const confirmAnswer = () => {
    // send setChose data to Api
  };

  const [visible, setVisible] = useState({
    cont: false,
    start: false,
    level: false,
  });

  const handleOk = () => {
    setLoading(true);
    api
      .GET('/ContinueExam')
      .then(res => {
        setResModel(res);
        setVisible({});
        setLoading(false);
      })
      .catch(() => setError(true));
  };

  const handleCancel = () => {
    history.push('/');
    setVisible({
      cont: false,
      start: false,
      level: false,
    });
  };

  const confirmContinue = () => {
    return (
      <Modal
        title="Continue doing the recent test?"
        visible={visible.cont}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back Home
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Continue testing
          </Button>,
        ]}
      >
        You have an unfinished exam
      </Modal>
    );
  };

  const showLevelSelection = () => {
    setVisible({
      level: true,
    });
  };
  const confirmStart = () => {
    return (
      <Modal
        title="Confirm to start the test?"
        visible={visible.start}
        onOk={showLevelSelection}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back Home
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={showLevelSelection}
          >
            Start testing
          </Button>,
        ]}
      >
        You have 45 minutes to do the test
      </Modal>
    );
  };

  const handleStart = () => {
    setLoading(true);
    api
      .POST('/BeginDoTest', { level: level })
      .then(res => {
        setResModel(res);
        setVisible({});
        setLoading(false);
      })
      .catch(() => setError(true));
  };

  const chooseLevel = () => {
    return (
      <Modal
        title="Choose the startup level..."
        visible={visible.level}
        onOk={handleStart}
        onCancel={handleCancel}
      >
        <Radio.Group value={level} onChange={e => setLevel(e.target.value)}>
          <Radio.Button value={1}>Easy</Radio.Button>
          <Radio.Button value={2}>Average</Radio.Button>
          <Radio.Button value={3}>Hard</Radio.Button>
        </Radio.Group>
      </Modal>
    );
  };

  const deadline = resModel.endDate;
  // const deadline = new Date(resModel.endDate); // deadline.getTime)();

  const handleFinish = () => {};

  useEffect(() => {
    setError(false);
    api
      .GET('/CheckContinueExam')
      .then(res => {
        if (res.continued) {
          setVisible({
            cont: true,
          });
        } else {
          setVisible({
            start: true,
          });
        }
      })
      .catch(() => setError(true));
  }, []);
  const header = <PageHeader title={TITLE} />;
  return (
    <MainLayout header={header}>
      <div className={styles.test}>
        {(error && <div>Error</div>) || (
          <div className="container">
            {confirmContinue()}
            {confirmStart()}
            {chooseLevel()}
            <div className="top">
              <Statistic.Countdown
                title="Time left: "
                value={deadline}
                onFinish={handleFinish}
              />
            </div>
            {showQuestion()}
            <Button type="primary" onClick={confirmAnswer}>
              Next question
              <Icon type="right" />
            </Button>
            {AnswerChart(dataForChart)}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Test;
