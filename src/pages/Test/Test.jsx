import React, { useState, useEffect } from 'react';
import Container from '../Container/Container';
import { Radio, Input } from 'antd';

import styles from './Test.module.scss';
import api from '../../services/api';

const TITLE = 'Test';

const Test = () => {
  const [chose, setChose] = useState('');
  const [question, setQuestion] = useState({
    id: '0',
    content: 'Question content',
    answers: [
      {
        id: '0',
        content:
          'Answer 0uhasdkjhasdjhfkajsdhrkjhwsdklafjnaks;jehrjasdf;jkanslkejroasdng;akjdsbfkjawelkjfaskdflkasjdhfaskdhtkawjkjfsdabkfjas that la vai lzckjlsadhasdjhfksadjf',
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

  return (
    <Container title={TITLE}>
      <div className={styles.test}>
        <div className="container">
          <h2>
            Question {question.id + 1}: {question.content}
          </h2>
          {showQuestion()}
        </div>
        ;
      </div>
    </Container>
  );
};

export default Test;
