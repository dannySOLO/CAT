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
              Question {resModel.idQuestion}: {resModel.contentQuestion}
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
  const handleOk = () => {
    api.GET('/ContinueExam').then(res => {
      setResModel(res);
    });
  };

  const handleCancel = () => {
    history.push('/');
  };

  const confirmContinue = () => {
    Modal.confirm({
      title: 'Do you want to continue?',
      content: 'Continue the previos exam or back to dashboard...',
      okText: 'Continue',
      cancelText: 'Back Home',
      onOk: { handleOk },
      onCancel: { handleCancel },
    });
  };

  const handleStart = () => {
    api.GET('BeginDoTest').then(res => setResModel(res));
  };

  const confirmStart = () => {
    Modal.confirm({
      title: 'Do you want to start the test?',
      content: 'The test will last in 45 minutes.',
      okText: 'Start',
      cancelText: 'Back Home',
      onOk: { handleStart },
      onCancel: { handleCancel },
    });
  };

  const deadline = 1575482415863;

  const handleFinish = () => {};

  useEffect(() => {
    api
      .GET('/CheckContinueExam')
      .then(res => {
        if (res.continued) {
          confirmContinue();
        }
        // else history.push('/');
        else {
          confirmStart();
        }
      })
      .catch(() => setError(true));
  });
  const header = <PageHeader title={TITLE} />;
  return (
    <MainLayout header={header}>
      <div className={styles.test}>
        {(error && <div>Error</div>) || (
          <div className="container">
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
