import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'; 
import { changeValue } from '../redux/ValuesReducer';
import { useEffect, useContext } from 'react';
import { LightContext } from '../components/LightContext';
import ResultLine from './ResultLine/ResultLine';

export default function Results() {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();

  const { light } = useContext(LightContext);

  useEffect(() => {
    let resultsBlock = document.querySelector('#resultsBlock');
    if (!light) {
      resultsBlock.style.backgroundColor = "#303030";
    } else {
      resultsBlock.style.backgroundColor = "#FFFFFF"
    }
  }, [light])

  let downPay = Math.round(global.purchasePrice * (global.downPaymentPercent / 100))

  let closingCosts = Math.round((global.closingCosts / 100) * global.purchasePrice)
  let repairs = Math.round((global.upfrontRepairs / 100) * global.purchasePrice)

  // "Down Pay + Closing Costs + 5% repairs after buying the house"
  let allIn = Math.round(((global.purchasePrice * (global.downPaymentPercent / 100))) 
  + (((global.closingCosts / 100) * global.purchasePrice))
  + (((global.upfrontRepairs / 100) * global.purchasePrice)))

  // MORTGAGE CALCULATIONS HERE!
  let loanAmount = Math.round(global.purchasePrice * (100 - global.downPaymentPercent) / 100) 
  let monthlyInterestRate = (global.interestRate / 100) / 12;
  let loanMonths = global.loanTerm;

  let first = loanAmount * monthlyInterestRate;
  let second = Math.pow((1 + monthlyInterestRate), loanMonths);
  let third = (Math.pow((1 + monthlyInterestRate), loanMonths)) - 1;

  let calculatedMonthlyMortgage = Math.round(
    (first * second) / third
  )

  useEffect(() => {
    dispatch(changeValue(calculatedMonthlyMortgage, "mortgagePayments"))
  }, [calculatedMonthlyMortgage])


  let monthlyExpenses = Math.round(
      Number(global.mortgagePayments) +
      Number(global.propertyTaxes / global.propertyTaxFrequency) +
      Number(global.insurance / global.insuranceFrequency) +
      (global.repairs * global.rent) / 100 +
      (global.vacancy * global.rent) / 100 +
      (global.capEx * global.rent) / 100 +
      (global.mgmtFees * global.rent) / 100 +
      Number(global.electricity) + 
      Number(global.gas) +
      Number(global.water) +
      Number(global.garbage) +
      Number(global.hoa)
    )

  let noi = (global.rent - monthlyExpenses) * 12
  let coc = noi /allIn;


  return (
     <div id="results">
        <div className={`${styles.results}`} id="resultsBlock">
          
          <div>
            <h3 className={styles.spaceBetween}>Property Info</h3>
            <ResultLine result="Address:" number={global.address}/>
            <ResultLine result="Purchase Price:" number={`$${global.purchasePrice}`}/>
            <ResultLine result="Loan Amount:" number={`$${loanAmount}`}/>
          </div>

          <div>
            <h3 className={styles.spaceBetween}>
              <span>Initial Investment: </span>
              <span>{`$${allIn}`}</span>
            </h3>
            <ResultLine result="Down Payment:" number={`$${downPay}`}/>
            <ResultLine result="Closing Costs:" number={`$${closingCosts}`}/>
            <ResultLine result="Upfront Repairs:" number={`$${repairs}`}/>
          </div>

          <div>
            <h3 className={styles.spaceBetween}>
              <span>Monthly Expenses: </span>
              <span>{`$${monthlyExpenses}`}</span>
            </h3>
            <ResultLine result="Monthly Mortgage:" number={`$${global.mortgagePayments}`}/>
            <ResultLine result="Property Taxes:" number={`$${Math.round(global.propertyTaxes / global.propertyTaxFrequency)}`}/>
            <ResultLine result="Insurance:" number={`$${Math.round(global.insurance / global.insuranceFrequency)}`}/>
            <ResultLine result={"Repairs & Maintenance:"} number={`$${Math.round((global.repairs * global.rent) / 100)}`}/>
            <ResultLine result={"Vacancy:"} number={`$${Math.round((global.vacancy * global.rent) / 100)}`}/>
            <ResultLine result={"Capital Expenditures:"} number={`$${Math.round((global.capEx * global.rent) / 100)}`}/>
            <ResultLine result={"Management Fees:"} number={`$${Math.round((global.mgmtFees * global.rent / 100))}`}/>
            <ResultLine result={"Electricity:"} number={`$${global.electricity}`}/>
            <ResultLine result={"Gas:"} number={`$${global.gas}`}/>
            <ResultLine result={"Water/Sewage:"} number={`$${global.water}`}/>
            <ResultLine result={"Garbage:"} number={`$${global.garbage}`}/>
            <ResultLine result={"HOA Fees:"} number={`$${global.hoa}`}/>
          </div>

          <div>
            <h3 className={styles.spaceBetween}>Net Cash Flow</h3>
            <ResultLine result={"Monthly Rental Income:"} number={`$${global.rent}`}/>
            <ResultLine result={"Monthly Expenses:"} number={`$${monthlyExpenses}`}/>
            <ResultLine result={"Monthly Cash Flow:"} number={`$${Math.ceil(noi / 12)}`}/>
            <ResultLine result={"Annual Cash Flow (NOI):"} number={`$${Math.ceil(noi)}`}/>
            <ResultLine result={"Total All-In Cash Needed:"} number={`$${allIn}`}/>
            <div style={{backgroundColor: "#b8f2d1", borderRadius: "15px", padding: "0.11em 1em", margin: "1em"}}>
              <h2>Cash On Cash (CoC): {(!coc ? "0.00" : (coc * 100).toFixed(2)) + "%"}</h2>
              {/* <small>Typically 8-15% or higher would be a good deal</small> */}
            </div>
          </div>

        </div>
      </div>
  )
};