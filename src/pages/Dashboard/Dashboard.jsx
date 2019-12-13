import React from 'react';
import { PageHeader, Card } from 'antd';

import MainLayout from 'layouts/Main';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const header = <PageHeader title="Dashboard" />;
  return (
    <MainLayout header={header}>
      <Card className={styles.dashboard} bordered={false}>
        <div className="container">
          <div class="field-item even" property="content:encoded">
            <p>
              Computerized adaptive testing (CAT) is the redesign of
              psychological and educational measuring instruments for delivery
              by interactive computers. CAT can be used for tests of ability or
              achievement and for measures of personality and attitudinal
              variables. Its objective is to select, for each examinee, the set
              of test questions from a pre-calibrated item bank that
              simultaneously most effectively and efficiently measures that
              person on the trait.
            </p>

            <p>
              <a href="http://iacat.org/node/442">
                The First Adaptive Test: Binet's IQ Test
              </a>
            </p>
            <p>
              <a href="http://iacat.org/?q=node/443">
                A Computer-Delivered More Efficient Variation of the Binet Test
              </a>
            </p>
            <p>
              <strong>CAT Using Item Response Theory</strong>
            </p>

            <li>
              <p align="left">
                <a href="http://iacat.org/?q=node/445">
                  Some IRT Concepts Used in CAT
                </a>
              </p>
            </li>
            <li>
              <p align="left">
                <a href="http://iacat.org/?q=node/446">IRT-Based CAT</a>
              </p>
            </li>
            <li>
              <p align="left">
                <a href="http://iacat.org/?q=node/447">A Sample CAT</a>
              </p>
            </li>

            <strong>Non-IRT Approaches to CAT</strong>

            <p>
              Not all approaches to CAT use IRT. When a test is being used to
              classify an examinee, the problem can be approached from an IRT
              perspective or from a decision theory perspective. For example,
              Lawrence Rudner has proposed a measurement decision theory (MDT)
              approach to making mastery or other dichotomous classification
              decisions. His{' '}
              <a href="http://edres.org/mdt" target="_blank">
                MDT Web site
              </a>{' '}
              describes how this approach works and provides an interactive
              tutorial on MDT, as well as other resources and references on MDT
              and related issues.
            </p>

            <strong>About this test</strong>
            <p>
              You will have 45 minutes to do the test and the result will be
              caculated right after you answer enough number of questions.
            </p>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
