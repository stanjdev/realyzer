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
        
        {global.imgs.length > 0 ? global.imgs.map((img, i) => <img src={img} key={i} />) : <span>hello</span>}

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
              <button onClick={loadImages}>load imgs</button>
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
            <p>
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

          <div className={`${styles.card} ${styles.flex}`}>
            <p htmlFor="downPaymentPercent">Down Payment </p>
            <div className={styles.column}>
              <p>
                <input 
                  name="downPaymentPercent"
                  type="range"
                  onChange={handleChange}
                  value={global.downPaymentPercent}
                  className={styles.range}
                />
                <span>%</span>
                <input 
                  name="downPaymentPercent" 
                  maxLength="3"
                  required 
                  type="text" 
                  onChange={handleChange}
                  value={global.downPaymentPercent}
                  placeholder="Down Payment" 
                  className={`${styles.percentInput}`}
                />
              </p>
            </div>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            <section>Closing Costs 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="closingCostInfo">2-4% of Purchase Price</span>
              </div>    
            </section>
     
            <p>
              <span>%</span>
              <input 
                name="closingCosts" 
                required 
                maxLength="3"
                type="text" 
                onChange={handleChange}
                placeholder="0" 
                className={`${styles.percentInput}`}
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <section>Upfront Repairs (Rehab Budget)
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="upfrontRepairsInfo">4-5% of Purchase Price</span>
              </div>    
            </section>   
         
            <p>
              <span>%</span>
              <input 
                name="upfrontRepairs"  
                maxLength="3"
                type="text" 
                onChange={handleChange}
                placeholder="0" 
                className={`${styles.percentInput}`}
              />
            </p>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            <p>Rental Income (mo.) </p>
            <p>
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
            <section>Mortgage Payments {" "}
            <div className={styles.popup} onClick={handleClick}>&#9432;
              <div className={styles.popuptext} id="mortgageInfo">Mortgage Calculators: <br />
              <a href="https://www.bankrate.com/calculators/mortgages/mortgage-calculator.aspx" target="_blank">Bankrate</a> <br />
                <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow</a>
              </div>
            </div>
            </section>
            <p>
              <span>$</span>
              <input 
                name="mortgagePayments" 
                type="number" 
                onChange={handleChange}
                placeholder="Monthly Payments"
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <section>Property Taxes 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="upfrontRepairsInfo">(e.g. 1.25% of purchase price in CA)</span>
              </div>
            </section>

            <p>
              <select name="propertyTaxFrequency" value={global.propertyTaxFrequency} onChange={handleChange} className={styles.select}>
                <option value="12">Annual</option>
                <option value="1">Monthly</option>
              </select>
              <span>$</span>
              <input 
                name="propertyTaxes"
                type="number" 
                onChange={handleChange} 
                placeholder="0" 
                required 
              />
            </p>            
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Insurance </p>
            <p>
              <select name="insuranceFrequency" value={global.insuranceFrequency} onChange={handleChange} className={styles.select}>
                <option value="12">Annual</option>
                <option value="1">Monthly</option>
              </select>
              <span>$</span>
              <input 
                name="insurance" 
                type="number" 
                onChange={handleChange} 
                placeholder="0" 
                required 
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Repairs & Maintenance </p>
            <p>
              <span>%</span>
              <input name="repairs" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder={`0`} required className={`${styles.percentInput}`}/>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <section>Vacancy Allowance 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="vacancyInfo">Economic vacancy factor of 5% of monthly income</span>
              </div>
            </section>

            <p>
              <span>%</span>
              <input name="vacancy" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="0" required className={`${styles.percentInput}`}/>
            </p>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            <p>Capital Expenditures (CapEx) </p>
            <p>
              <span>%</span>
              <input name="capEx" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 7" required className={`${styles.percentInput}`}/>
            </p>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            <section>Management Fees 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="managementInfo">8-10% of monthly income</span>
              </div>
            </section>

            <p>
              <span>%</span>
              <input name="mgmtFees" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 10" required className={`${styles.percentInput}`}/>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Electricity </p>
            <p>
              <span>$</span>
              <input name="electricity" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Gas </p>
            <p>
              <span>$</span>
              <input name="gas" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Water/Sewer </p>
            <p>
              <span>$</span>
              <input name="water" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>Garbage </p>
            <p>
              <span>$</span>
              <input name="garbage" defaultValue="" type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <p>HOA Fees </p>
            <p>
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
              {global.logo ? <img src={URL.createObjectURL(global.logo)} height="175" onLoad={URL.revokeObjectURL(this)}/> : <img src="/favicon.ico"/>}
            </div>
          </div>

        <Link href="/results"><button className="button">Print Results!</button></Link>

      </div>
      
      <div className={`${styles.results_container}`}>
        <Results />
      </div>

    </div>

  )
}