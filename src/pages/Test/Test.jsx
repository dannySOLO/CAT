import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/Main';
import { Radio, Button, Icon, PageHeader } from 'antd';

import AnswerChart from '../AnswerChart/AnswerChart';
import styles from './Test.module.scss';
import api from '../../services/api';

const TITLE = null;

const Test = () => {
  const [chose, setChose] = useState('');
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

  const [question, setQuestion] = useState({
    id: '0',
    content: 'Question content',
    answers: [
      {
        id: '0',
        content:
          'Answer 0uhasdkjhasdjhfkajsdhrkjhwsdklafjnaks;jehrjasdf;jkanslkejroasdng;akjdsbfkjawelkjfaskdflkasjdhfaskdhtkawjkjfsdabkfjas that la vai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksai lzckjlsadhasdjhfksadjf',
      },
      {
        id: '1',
        content: 'Answer 1',
      },
      {
        id: '2',
        content: 'Answer 2',
      },
      {
        id: '3',
        content: 'Answer 3',
      },
    ],
  });

  // useEffect(() => {
  //   api.GET('/question').then(res => setQuestion(res));
  // }, []);

  // ======== question - answer =======

  const radioStyle = {
    // width: '400px',
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
      <Radio.Group id="ans-choose" onChange={handleChange} value={chose}>
        {question.answers.map(ans => (
          <Radio style={radioStyle} value={ans.id + 1}>
            {ans.content}
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  const confirmAnswer = () => {
    // send setChose data to Api
  };

  const header = <PageHeader title={TITLE} />;
  return (
    <MainLayout header={header}>
      <div className={styles.test}>
        <div className="container">
          <h2>
            Question {question.id + 1}: {question.content}
          </h2>
          {showQuestion()}
          <Button type="primary" onClick={confirmAnswer}>
            Next question
            <Icon type="right" />
          </Button>
        </div>
      </div>
      {AnswerChart(dataForChart)}
    </MainLayout>
  );
};

export default Test;
