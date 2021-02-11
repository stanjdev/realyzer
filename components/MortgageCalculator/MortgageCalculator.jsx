import React from 'react';
import styles from './MortgageCalculator.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../../redux/ValuesReducer';

export default function MortgageCalculator() {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeValue(value, name));
  }

  return (
    <div className={` ${styles.mortgage}`}>
          <div className={`${styles.card}`} style={{borderBottom: 0, marginTop: "1em", marginBottom: "-1em"}}> 
            <h3>Mortgage Calculation</h3>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Down Payment</p>
              <small>Typically 20%, Minimum 3.5%</small>
            </div>
            <div className={styles.column}>
              <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
                <span>%</span>
                <input 
                  name="downPaymentPercent" 
                  maxLength="3"
                  required 
                  type="text" 
                  onChange={handleChange}
                  value={global.downPaymentPercent}
                  placeholder="Down Payment" 
                  autoComplete="off"
                  className={`${styles.percentInput}`}
                />
              </p>
                <input 
                  name="downPaymentPercent"
                  type="range"
                  onChange={handleChange}
                  value={global.downPaymentPercent}
                  className={styles.range}
                />
            </div>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Interest Rate</p>
              <small>Typically Between 3-4%</small>
            </div>
            <div className={styles.column}>
              <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
                <span>%</span>
                <input 
                  name="interestRate" 
                  maxLength=""
                  required 
                  type="number"
                  step="0.01"
                  onChange={handleChange}
                  value={global.interestRate}
                  placeholder="e.g. 3.92" 
                  className={`${styles.percentInput}`}
                />
              </p>
                <input 
                  name="interestRate"
                  type="range"
                  step="0.01"
                  min="0"
                  max="20"
                  onChange={handleChange}
                  value={global.interestRate}
                  className={styles.range}
                />
            </div>
          </div>

          <div className={`${styles.card} ${styles.flex}`} style={{borderColor: "#222222"}}>
            <div>
              <p>Length of Loan</p>
              <small>Typically 30 Years</small>
            </div>
            <p>
              <select name="loanTerm" value={global.loanTerm} onChange={handleChange} className={styles.select}>
                <option value="120">10 Year</option>
                <option value="180">15 Year</option>
                <option value="240">20 Year</option>
                <option value="300">25 Year</option>
                <option value="360">30 Year</option>
              </select>
            </p>            
          </div>

          <div className={`${styles.card} ${styles.flex}`} style={{paddingBottom: "3em"}}>
            <section className={`${styles.yourMonthlyMortgage}`}>Your Monthly Mortgage Payments</section>
            <section className={`${styles.inputUnit} `}>
              <p>${`${global.mortgagePayments}`}</p>
            </section>
          </div>
        </div>
  )
};