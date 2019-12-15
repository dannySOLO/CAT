import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from 'layouts/Main';
import { Radio, Button, Icon, PageHeader, Statistic, Modal, Spin } from 'antd';

// import AnswerChart from '../AnswerChart/AnswerChart';
import styles from './Test.module.scss';
import api from '../../services/api';

const TITLE = null;

const Test = () => {
  const history = useHistory();
  const [chose, setChose] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState(2);
  const [init, setInit] = useState(false);

  // const dataForChart = [
  //   {
  //     id: 0,
  //     prediction: 5,
  //   },
  //   {
  //     id: 1,
  //     prediction: 4,
  //   },
  //   {
  //     id: 2,
  //     prediction: 6,
  //   },
  //   {
  //     id: 3,
  //     prediction: 4.5,
  //   },
  //   {
  //     id: 4,
  //     prediction: 5,
  //   },
  //   {
  //     id: 5,
  //     prediction: 5.3,
  //   },
  //   {
  //     id: 6,
  //     prediction: 5.1,
  //   },
  //   {
  //     id: 7,
  //     prediction: 5.2,
  //   },
  // ];

  const [resModel, setResModel] = useState({});

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const handleChange = e => {
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
                <Radio
                  style={radioStyle}
                  key={ans.idAnswer}
                  value={ans.idAnswer}
                >
                  {ans.contentAnswer}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}
      </div>
    );
  };

  const [visible, setVisible] = useState({
    cont: false,
    start: false,
    level: false,
    end: false,
  });
  const confirmAnswer = () => {
    setLoading(true);
    setChose('');
    api
      .POST('/getNextQuestion', {
        examId: resModel.idExam,
        answerId: chose,
      })
      .then(res => {
        setLoading(false);
        setResModel(res);
        if (res.finished !== 'cont') {
          setVisible({ end: true });
        }
      })
      .catch(() => setError(true));
  };

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
    setVisible({});
  };

  const showResult = () => {
    history.push('/result');
    setVisible({});
  };

  const confirmEnd = () => {
    let title;
    let text;
    if (resModel.finished === 'complete') {
      title = 'Complete!';
      text = `Your grade is: ${resModel.grade}`;
    } else if (resModel.finished === 'timeout') {
      title = 'Time up!';
      text = 'You have not completed your exam in time!';
    } else if (resModel.finished === 'notvalue') {
      title = 'You complete!';
      text = `Your grade is: ${resModel.grade}`;
    }
    return (
      <Modal
        title={title}
        visible={visible.end}
        onOk={showResult}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back Home
          </Button>,
          <Button key="submit" type="primary" onClick={showResult}>
            Show Result
          </Button>,
        ]}
      >
        {text}
      </Modal>
    );
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
        You have an unfinished exam.
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
        You will have 45 minutes to do the test!
      </Modal>
    );
  };

  const handleStart = () => {
    setLoading(true);
    api
      .POST('/BeginDoTest', { level })
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

  const handleFinish = () => {
    setVisible({
      end: true,
    });
  };

  const countDown = () => {
    if (Date.now() < resModel.endDate && resModel.finished === 'cont') {
      window.onbeforeunload = () => {
        return 'You have an unfinished exam. Quit?';
      };
    }
    return (
      <Statistic.Countdown
        title="Time left: "
        value={resModel.endDate}
        onFinish={handleFinish}
      />
    );
  };

  useEffect(() => {
    setError(false);
    setInit(true);
    api
      .GET('/CheckContinueExam')
      .then(res => {
        setInit(false);
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

  const constructor = () => {
    return (
      <>
        {resModel.questionStt && (
          <>
            <div className="top">{countDown()}</div>
            {showQuestion()}
            {(loading && (
              <Button type="primary" loading>
                Next question
              </Button>
            )) || (
              <Button
                type="primary"
                onClick={confirmAnswer}
                disabled={chose === ''}
                icon="double-right"
              >
                Next question
              </Button>
            )}
          </>
        )}
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

  const header = <PageHeader title={TITLE} />;
  return (
    <MainLayout header={header}>
      <div className={styles.test}>
        {(error && errorNoti()) || (
          <div className="container">
            {init && initting()}
            {confirmContinue()}
            {confirmStart()}
            {chooseLevel()}
            {confirmEnd()}
            {constructor()}

            {/* {AnswerChart(dataForChart)} */}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Test;
