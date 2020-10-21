import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'; 


export default function Results() {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();

  let downPay = Math.round(global.purchasePrice * (global.downPaymentPercent / 100))

  let closingCosts = Math.round((global.closingCosts / 100) * global.purchasePrice)
  let repairs = Math.round((global.upfrontRepairs / 100) * global.purchasePrice)

  // "Down Pay + Closing Costs + 5% repairs after buying the house"
  let allIn = Math.round(((global.purchasePrice * (global.downPaymentPercent / 100))) 
  + (((global.closingCosts / 100) * global.purchasePrice))
  + (((global.upfrontRepairs / 100) * global.purchasePrice)))

  let loanAmount = Math.round(global.purchasePrice * (100 - global.downPaymentPercent) / 100) 

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
        <div className={`${styles.results}`}>
          <div>
            <h3>Property Info</h3>
            <div className={styles.spaceBetween}>
              <p>{`Address: `}</p>
              <p>{`${global.address}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Purchase Price: `}</p>
              <p>{`$${global.purchasePrice}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Loan Amount: `}</p>
              <p>{`$${loanAmount}`}</p>
            </div>
          </div>

          <div>
            <h3 className={styles.spaceBetween}>
              <span>Initial Investment: </span>
              <span>{`$${allIn}`}</span>
            </h3>
            <div className={styles.spaceBetween}>
              <p>{`Down Payment:`}</p>
              <p>{`$${downPay}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Closing Costs:`}</p>
              <p>{`$${closingCosts}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Upfront Repairs:`}</p>
              <p>{`$${repairs}`}</p>
            </div>
            {/* <h2>Total Investment: {`$${allIn}`}</h2> */}
          </div>

          <div>
            <h3 className={styles.spaceBetween}>
              <span>Monthly Expenses: </span>
              <span>{`$${monthlyExpenses}`}</span>
            </h3>
            <div className={styles.spaceBetween}>
              <p>{`Monthly Mortgage:`}</p>
              <p>{`$${global.mortgagePayments}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Property Taxes:`}</p>
              <p>{`$${Math.round(global.propertyTaxes / global.propertyTaxFrequency)}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Insurance:`}</p>
              <p>{`$${Math.round(global.insurance / global.insuranceFrequency)}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Repairs & Maintenance:`}</p>
              <p>{`$${Math.round((global.repairs * global.rent) / 100)}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Vacancy:`}</p>
              <p>{`$${Math.round((global.vacancy * global.rent) / 100)}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Capital Expenditures:`}</p>
              <p>{`$${Math.round((global.capEx * global.rent) / 100)}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Management Fees:`}</p>
              <p>{`$${Math.round((global.mgmtFees * global.rent / 100))}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Electricity:`}</p>
              <p>{`$${global.electricity}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Gas:`}</p>
              <p>{`$${global.gas}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Water/Sewage:`}</p>
              <p>{`$${global.water}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Garbage:`}</p>
              <p>{`$${global.garbage}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`HOA Fees:`}</p>
              <p>{`$${global.hoa}`}</p>
            </div>
            {/* <h2>{`Total Monthly Expenses: $${monthlyExpenses}`}</h2> */}
          </div>

          <div>
            <h3>Net Cash Flow</h3>
            <div className={styles.spaceBetween}>
              <p>{`Monthly Rental Income:`}</p>
              <p>{`$${global.rent}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`Monthly Expenses:`}</p>
              <p>{`$${monthlyExpenses}`}</p>
            </div>
            <hr/>
            <div className={styles.spaceBetween}>
              <p>{`Monthly Cash Flow:`}</p>
              <p>{`$${Math.ceil(noi / 12)}`}</p>
            </div>
            <div className={styles.spaceBetween}>
              <p>{`NOI (Annual):`}</p>
              <p>{`$${Math.ceil(noi)}`}</p>
            </div>
            <hr />
            <div className={styles.spaceBetween}>
              <p>{`Total All-In Cash Needed:`}</p>
              <p>{`$${allIn}`}</p>
            </div>
            <h2>CoC  &rarr; {(coc * 100).toFixed(2) + "%"}</h2>
          </div>
        </div>
      </div>
  )
}