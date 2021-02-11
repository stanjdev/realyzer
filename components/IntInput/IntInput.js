import React from 'react';
import styles from './IntInput.module.css';

export default function IntInput(props) {
  return (
    <div className={`${styles.card} ${styles.flex}`}>
      {/* <section> OPTIONAL INFO POP UP - Management Fees 
        <div className={styles.popup} onClick={handleClick}>&#9432;
          <span className={styles.popuptext} id="managementInfo">8-10% of monthly income</span>
        </div>
      </section> */}
      <div>
        <p>{props.title}</p>
        <small>{props.subTitle}</small>
      </div>
      <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
        <span>{props.symbol}</span>
        <input 
          name={props.inputName} 
          maxLength={props.maxLength || null}
          defaultValue={props.defaultValue || null}
          value={props.inputValue} 
          type={props.inputType}
          onChange={props.onChange} 
          placeholder={props.placeholder}
          required={props.required || null}
          className={props.styling || null}
          autoComplete={props.autoComplete || null}
          style={props.inlineStyle || null}
        />
      </p>
    </div>
  )
};