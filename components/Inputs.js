/* eslint-disable react/react-in-jsx-scope */
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../redux/ValuesReducer';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Results from './Results';

export default function Inputs () {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();

  const [textAreaValue, setTextAreaValue] = useState();

  function handleChange(e) {
    // https://reactjs.org/docs/forms.html
    /* const { name, value, type, checked } = event.target 
    (event.target will hold whatever attributes of 
    the element you click! or target!) */
    const { value, name } = e.target
    dispatch(changeValue(value, name))
  }


  const handleCheckboxChange = (e) => {
    console.log(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!")
    console.log("$" + global.propertyValue);
  }

  const handleTextAreaValueChange = e => {
    setTextAreaValue(e.target.value);
  }


  // Sticky results scroll
  useEffect(() => {
    window.onscroll = function() {stickyBlock()}
    
    let results = document.getElementById('results');
    let sticky = results.offsetTop;
    
    
    function stickyBlock() {
      if (window.pageYOffset > sticky) {
        console.log("window y offset: ", window.pageYOffset)
        console.log("sticky: ", sticky)
        console.log("offsetHeight: ", results.offsetHeight)
        
        results.classList.add(styles.sticky);
      } else {
        results.classList.remove(styles.sticky);
      }
    }
  }, [])

  // clicking info popups
  const handleClick = e => {
    e.currentTarget.children[0].classList.toggle(styles.show)
  }

  // setting uploaded image
  const onFileChange = e => {
    console.log(e.target.files[0])
    const {name} = e.target;
    dispatch(changeValue(e.target.files[0], name))
  }



  // image scraper client-side
  useEffect(() => {
    // console.log(global.url)
    console.log(global.imgs.length)
  }, [global.imgs])

  const loadImages = async () => {

    if (global.url) {
      const res = await fetch('/api/scraper/scraper', { 
        method: 'POST', 
        body: JSON.stringify(global.url) 
      });
      
      const data = await res.json();
      // console.log(data)
      dispatch(changeValue(data, 'imgs'))
    }
  }











  return (

    <div className={styles.flex_container}>
      <div className={styles.leftInputs}>
        
        {global.imgs.length > 0 ? global.imgs.map((img, i) => <img src={img} key={i} />) : null}

          <div className={`${styles.card} ${styles.flex}`}>
            <p>MLS URL</p>
            <p>
              <input 
                name="url" 
                required 
                type="text" 
                onChange={handleChange}
                placeholder="MLS URL" 
                className={styles.wideInput}
                autoComplete="off"
              />
              <button onClick={loadImages}>temp load imgs</button>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Address </p>
            <p>
              <input 
                name="address" 
                required 
                type="text" 
                onChange={handleChange}
                placeholder="Property Address" 
                className={styles.wideInput}
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Purchase Price </p>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input 
                name="purchasePrice" 
                required 
                type="number" 
                onChange={handleChange}
                placeholder="e.g. 500000" 
              />
            </p>
          </div>

        <div className={`${styles.card} ${styles.mortgage}`}>
          <h3>Mortgage Calculation</h3>

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

          <div className={`${styles.card} ${styles.flex}`}>
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

          <div className={`${styles.card} ${styles.flex}`}>
            <section>Your Estimated Mortgage Payments {" "}
            {/* <div className={styles.popup} onClick={handleClick}>&#9432;
              <div className={styles.popuptext} id="mortgageInfo">Mortgage Calculators: <br />
                <a href="https://www.bankrate.com/calculators/mortgages/mortgage-calculator.aspx" target="_blank">Bankrate</a> <br />
                <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow</a>
              </div>
            </div> */}
            </section>
            <p className={`${styles.inputUnit} `}>
              <span>$</span>
              <input 
                name="mortgagePayments" 
                type="number" 
                onChange={handleChange}
                value={global.mortgagePayments}
                placeholder="Monthly Payments"
                readOnly
                className={styles.mortgageResult}
              />
            </p>
          </div>
        </div>




          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Rental Income</p>
              <small>Per Month</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input 
                name="rent" 
                required 
                type="number" 
                onChange={handleChange}
                placeholder="Monthly Rent"
              />
            </p>
          </div>



          <div className={`${styles.card} ${styles.flex}`}>
            <section>Property Taxes 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <small className={styles.popuptext}>(e.g. 1.25% of purchase price in CA) <br/> Typically Between 3-4%</small>
              </div>
            </section>

              <p className={styles.capsuleInput}>
                <span>$</span>
                <input 
                  name="propertyTaxes"
                  type="number" 
                  onChange={handleChange} 
                  placeholder="0" 
                  required 
                />
                <select name="propertyTaxFrequency" value={global.propertyTaxFrequency} onChange={handleChange} className={styles.select}>
                  <option value="12">Annual</option>
                  <option value="1">Monthly</option>
                </select>
              </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Insurance</p>
              <small>Typically XXX</small>
            </div>

            <p className={styles.capsuleInput}>
              <span>$</span>
              <input 
                name="insurance" 
                type="number" 
                onChange={handleChange} 
                placeholder="0" 
                required 
              />
              <select name="insuranceFrequency" value={global.insuranceFrequency} onChange={handleChange} className={styles.select}>
                <option value="12">Annual</option>
                <option value="1">Monthly</option>
              </select>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <section>Closing Costs 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="closingCostInfo">2-4% of Purchase Price <br/> Typically 5%</span>
              </div>    
            </section>
     
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input 
                name="closingCosts" 
                required 
                maxLength="3"
                type="text" 
                onChange={handleChange}
                placeholder="e.g. 4" 
                className={`${styles.percentInput}`}
                autoComplete="off"
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <section>Upfront Repairs (Rehab Budget)
                <div className={styles.popup} onClick={handleClick}>&#9432;
                  <span className={styles.popuptext} id="upfrontRepairsInfo">4-5% of Purchase Price</span>
                </div>
              </section>   
              <small>% of Home Value</small>
            </div>
         
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input 
                name="upfrontRepairs"  
                maxLength="3"
                type="text" 
                onChange={handleChange} 
                className={`${styles.percentInput}`}
                autoComplete="off"
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Repairs & Maintenance </p>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input name="repairs" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder={`e.g. 5`} required className={`${styles.percentInput}`} autoComplete="off"/>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            {/* <section>Vacancy Allowance 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="vacancyInfo">Economic vacancy factor of 5% of monthly income</span>
              </div>
            </section> */}

            <div>
              <p>Vacancy Allowance</p>
              <small>Typically 5% of Monthly Income</small>
            </div>

            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input name="vacancy" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 5" required className={`${styles.percentInput}`} autoComplete="off"/>
            </p>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            <p>Capital Expenditures (CapEx) </p>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input name="capEx" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 7" required className={`${styles.percentInput}`} autoComplete="off"/>
            </p>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            {/* <section>Management Fees 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="managementInfo">8-10% of monthly income</span>
              </div>
            </section> */}
            
            <div>
              <p>Management Fees</p>
              <small>Typically 8-10% of Monthly Income</small>
            </div>

            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input name="mgmtFees" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 10" required className={`${styles.percentInput}`} autoComplete="off"/>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Electricity</p>
              <small>Monthly</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="electricity" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Gas</p>
              <small>Monthly</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="gas" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Water/Sewer </p>
              <small>Monthly</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="water" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Garbage</p>
              <small>Monthly</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="garbage" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>HOA Fees </p>
              <small>Monthly</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="hoa" defaultValue="" type="number" onChange={handleChange} placeholder="0" />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Import your logo &rarr; </p>
              <p>
                <input 
                  name="logo"
                  type="file"
                  onChange={onFileChange}
                  className={styles.importLogo}
                  style={{ padding: 0, backgroundColor: "inherit", border: "none"}}
                />
              </p>
            </div>
            <div>
              {global.logo ? <img src={URL.createObjectURL(global.logo)} height="130" onLoad={URL.revokeObjectURL(this)}/> : <img src="/favicon.png" height="80"/>}
            </div>
          </div>

        <Link href="/results"><button id="printButton" className="button">Print Results!</button></Link>

      </div>
      
      <div className={`${styles.results_container}`}>
        <Results />
      </div>

    </div>

  )
}