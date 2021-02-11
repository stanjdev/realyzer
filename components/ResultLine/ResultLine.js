import React from 'react';
import styles from './ResultLine.module.css';

export default function ResultLine({ result, number }) {
  return (
    <div className={styles.spaceBetween}>
      <p>{result}</p>
      <p>{number}</p>
    </div>
  )
};