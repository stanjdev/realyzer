/* eslint-disable react/react-in-jsx-scope */
import styles from '../styles/Home.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../redux/ValuesReducer';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Results from './Results';
import { LightContext } from '../components/LightContext';
import Map from '../components/Map';

export default function Inputs () {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();



  // PROPERTY TAX RATES
  useEffect(() => {
    scrapePropertyTaxRates();
  }, [])
  
  const scrapePropertyTaxRates = async () => {
    const res = await fetch('/api/scraper/propertyTaxRateScraper');
    const dataObject = await res.json();
    // console.log(dataObject);
    if (dataObject) {
      dispatch(changeValue(dataObject, 'propertyTaxRates'))
    }
    // console.log(global.propertyTaxRates);
  }
  
  let currentStatePropTaxRate = global.propertyTaxRates[global.americanState] ? global.propertyTaxRates[global.americanState].replace(/\%/g, "") : null;
  let calculatedPropertyTax = Math.round(((currentStatePropTaxRate / 100) * global.purchasePrice) / 12);

  useEffect(() => {
    dispatch(changeValue(calculatedPropertyTax, "propertyTaxes"))
  }, [calculatedPropertyTax])





  // Average Homeowners' Insurance Calculation 0.5% of purchase price
  let estimatedInsurance = Math.round(global.purchasePrice * 0.005 / 12)

  useEffect(() => {
    dispatch(changeValue(estimatedInsurance, "insurance"))
  }, [estimatedInsurance])





  
  // Inputs block light switch
  const { light } = useContext(LightContext);

  useEffect(() => {
    let leftInputBlock = document.querySelector('#leftInputs');
    if (!light) {
      leftInputBlock.style.backgroundColor = "#303030";
    } else {
      leftInputBlock.style.backgroundColor = "#FFFFFF"
    }
  }, [light])


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
        // console.log("window y offset: ", window.pageYOffset)
        // console.log("sticky: ", sticky)
        // console.log("offsetHeight: ", results.offsetHeight)
        
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





  // setting uploaded logo image
  let logoUpload = "";

  const onFileChange = e => {
    // console.log(e.target.files[0])
    const { name } = e.target;
    logoUpload = URL.createObjectURL(e.target.files[0]);
    dispatch(changeValue(logoUpload, name))
  }

  useEffect(() => {
    console.log(global.logo)
  }, [global.logo])


  
  // Manually uploading property photos
  const chosenImgFiles = [];
  const imgUrls = [];

  const uploadPropertyPhotos = e => {
    chosenImgFiles.push(e.target.files);
    for (let i = 0; i < chosenImgFiles[0].length; i++) {
      imgUrls.push(URL.createObjectURL(chosenImgFiles[0][i]))
    }
    // console.log(e.target.files.length)
    // console.log(imgUrls)
    const { name } = e.target;
    dispatch(changeValue(imgUrls, name))
  }
  useEffect(() => {
    // Object.entries(global.uploadedPhotos).forEach((key, value) => {
    //   console.log(key, value);
    //   const url = URL.createObjectURL(value[0]);
    //   console.log(url)
    // })
    // global.uploadedPhotos ? console.log(Object.entries(global.uploadedPhotos)) : null;
    console.log(global.uploadedPhotos)
  }, [global.uploadedPhotos])





  // image scraper client-side
  useEffect(() => {
    // console.log(global.url)
    // console.log(global.imgs.length)
  }, [global.imgs])

  const loadImages = async () => {
    if (global.url) {
      const res = await fetch('/api/scraper/imgScraper', { 
        method: 'POST', 
        body: JSON.stringify(global.url) 
      });
      
      const data = await res.json();
      console.log(data)
      dispatch(changeValue(data, 'imgs'))
    }
  }



  





  return (

    <div className={styles.flex_container}>
      <div className={styles.leftInputs} id="leftInputs">
        
        {/* {global.imgs.length > 0 ? global.imgs.map((image, i) => <img src={image} key={i} style={{maxWidth: "600px"}}/>) : <p>No images. Try again!</p>} */}

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Listing URL</p>
              <small>Paste from Redfin, Zillow, etc.</small>
            </div>
            <p>
              <input 
                name="url" 
                required 
                type="text" 
                onChange={handleChange}
                placeholder="Enter URL" 
                className={styles.wideInput}
                autoComplete="off"
                value={global.url}
                />
              {/* <button onClick={loadImages}>Load images (Redfin URL only, BUGGY)</button> */}
              {global.imgs.length > 0 ? <small>{global.imgs.length} images found!</small> : <small style={{visibility: "hidden"}}>Rental Property Calculator Cash</small>}
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Address</p>
              <small>Property Address</small>
            </div>
            <p>
              <input 
                name="address" 
                required 
                type="text" 
                onChange={handleChange}
                placeholder="Property Address" 
                className={styles.wideInput}
                value={global.address}
              />
              {<small style={{visibility: "hidden"}}>Rental Property Calculator Cash</small>}
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
                placeholder="$650,000" 
                style={{width: "130px"}}
                value={global.purchasePrice}
              />
            </p>
          </div>


        <Map />


        {/* <div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.59934256396!2d-83.21470258440573!3d42.39368094096994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca541ac662f7%3A0xfe4fc86a9ceb2945!2s14445%20Abington%20Ave%2C%20Detroit%2C%20MI%2048227!5e0!3m2!1sen!2sus!4v1603850580817!5m2!1sen!2sus" 
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.7754145000895!2d-89.87270658456936!3d35.137277667218044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x887f8367dd03be6f%3A0x281203e6b48e65ce!2s5739%20Ashbriar%20Ave%2C%20Memphis%2C%20TN%2038120!5e0!3m2!1sen!2sus!4v1603850394971!5m2!1sen!2sus" 
            width="600" 
            height="450" 
            frameborder="0" 
            style={{border: 0}}
            allowfullscreen="" 
            aria-hidden="false" 
            tabindex="0">
          </iframe>
        </div> */}


        <div className={` ${styles.mortgage}`}>
          <div className={`${styles.card}`} style={{borderBottom: 0, marginTop: "1em", marginBottom: "-1em"}}> 
            <h3>Mortgage Calculation</h3>
            {/* <h1>Simple Mortgage Calculator</h1> */}
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
              {/* <input 
                name="mortgagePayments" 
                type="number" 
                onChange={handleChange}
                value={global.mortgagePayments}
                placeholder="Monthly Payments"
                readOnly
                className={styles.mortgageResult}
              /> */}
            </section>
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
                placeholder="0"
                value={global.rent}
              />
            </p>
          </div>



          <div className={`${styles.card} ${styles.flex}`}>

            <div>
              <section>Property Taxes 
                <div className={styles.popup} onClick={handleClick}>&#9432;
                  <small className={styles.popuptext}>Source: <a href="https://wallethub.com/edu/states-with-the-highest-and-lowest-property-taxes/11585" target="_blank">U.S. Census Bureau</a></small>
                </div>
              </section>
              {/* <p>Property Taxes</p> */}
              <small>*Estimate for {global.americanState}: <br/> {currentStatePropTaxRate}% of Purchase Price = ${calculatedPropertyTax} Monthly</small>
            </div>

            <div className={styles.flex_together}>
              <p className={styles.capsuleInput}>
                <span>$</span>
                <input 
                  name="propertyTaxes"
                  type="number" 
                  onChange={handleChange}
                  value = {global.propertyTaxes}
                  placeholder="0"
                  required 
                />
              </p>
              <p>{`$${global.propertyTaxes * 12}/yr`}</p>
            </div>
                {/* <select name="propertyTaxFrequency" value={global.propertyTaxFrequency} onChange={handleChange} className={styles.select}>
                  <option value="12">Annual</option>
                  <option value="1">Monthly</option>
                </select> */}
          </div>


          {/* PROPERTY TAXES TABLE. Fixed: works . Toggle this table on and off via switch*/}
          {/* <iframe 
            src="https://e.infogram.com/66661e4a-4684-4adc-8a4b-a4b292776578?src=embed" 
            title="Average Property Taxes by State" 
            width="550" 
            height="1532" 
            scrolling="no" 
            frameborder="0" 
            style={{border: "none"}} 
            allowfullscreen="allowfullscreen">
          </iframe> */}



          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Insurance</p>
              <small>Typically 0.5% of Purchase Price</small> <br/>
              <small>(Average $1,400/yr in U.S.)</small>
            </div>

          <div className={styles.flex_together}>
            <p className={styles.capsuleInput}>
              <span>$</span>
              <input 
                name="insurance" 
                type="number" 
                onChange={handleChange} 
                placeholder="0" 
                required 
                value={global.insurance}
              />
            </p>
            <p>{`$${Math.round(global.insurance * 12)}/yr`}</p>
          </div>
              {/* <select name="insuranceFrequency" value={global.insuranceFrequency} onChange={handleChange} className={styles.select}>
                <option value="12">Annual</option>
                <option value="1">Monthly</option>
              </select> */}
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            {/* <section>Closing Costs 
              <div className={styles.popup} onClick={handleClick}>&#9432;
                <span className={styles.popuptext} id="closingCostInfo">2-4% of Purchase Price <br/> Typically 5%</span>
              </div>    
            </section> */}
            <div>
              <p>Closing Costs</p>
              <small>Typically 3-7% of Purchase Price</small>
            </div>
     
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
                {/* <div className={styles.popup} onClick={handleClick}>&#9432;
                  <span className={styles.popuptext} id="upfrontRepairsInfo">4-5% of Purchase Price</span>
                </div> */}
              </section>   
              <small>% of Purchase Price</small>
            </div>
         
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input 
                name="upfrontRepairs"  
                maxLength="3"
                type="text" 
                onChange={handleChange} 
                className={`${styles.percentInput}`}
                placeholder="0"
                autoComplete="off"
                value={global.upfrontRepairs}
              />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Repairs & Maintenance </p>
              <small>Typically 5-15% of Monthly Income</small>
            </div>
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
              <small>Typically 3-10% of Monthly Income</small>
            </div>

            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input name="vacancy" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 5" required className={`${styles.percentInput}`} autoComplete="off"/>
            </p>
          </div>


          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Capital Expenditures (CapEx) </p>
              <small>Typically 5-15% of Monthly Income</small>
            </div>
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
              <small>Typically 7-12% of Monthly Income</small>
            </div>

            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>%</span>
              <input name="mgmtFees" maxLength="3" defaultValue="" type="text" onChange={handleChange} placeholder="e.g. 10" required className={`${styles.percentInput}`} autoComplete="off"/>
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Electricity</p>
              <small>Monthly Electric Bill</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="electricity" value={global.electricity} type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Gas</p>
              <small>Monthly Gas Bill</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="gas" value={global.gas} type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Water/Sewer</p>
              <small>Monthly Water/Sewer Bill</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="water" value={global.water} type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>Garbage</p>
              <small>Monthly Garbage Bill</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="garbage" value={global.garbage} type="number" onChange={handleChange} placeholder="0"  />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`}>
            <div>
              <p>HOA Fees </p>
              <small>Monthly HOA Dues</small>
            </div>
            <p className={`${styles.inputUnit} ${styles.capsuleInput}`}>
              <span>$</span>
              <input name="hoa" value={global.hoa} type="number" onChange={handleChange} placeholder="0" />
            </p>
          </div>

          <div className={`${styles.card} ${styles.flex}`} style={{borderBottom: "none"}}>
            <div>
              <p>Import Your Logo for PDF Display (Optional) </p>
              <p>
                <input 
                  name="logo"
                  type="file"
                  onChange={onFileChange}
                  className={`${styles.importLogo}`}
                  style={{ padding: 0, backgroundColor: "inherit", border: "none", borderRadius: "0", width: "65%"}}
                />
              </p>
            </div>
            <div>
              {global.logo ? <img src={global.logo} width="120" alt="rental property calculator, rental income calculator"/> : <img src="/RealyzerPrint1.png" alt="rental income calculator, rental property calculator logo"/>}
            </div>
          </div>


          <div className={`${styles.card} ${styles.flex}`} style={{borderBottom: "none"}}>
            <div>
              <p>Import Property Photos (Optional) </p>
              <p>
                <input 
                  name="uploadedPhotos"
                  type="file"
                  onChange={uploadPropertyPhotos}
                  className={`${styles.importLogo}`}
                  style={{ padding: 0, backgroundColor: "inherit", border: "none", borderRadius: "0", width: "65%"}}
                  multiple
                />
              </p>
            </div>
            <div>
              {/* {global.uploadedPhotos.length > 0 ? Object.entries(global.uploadedPhotos).map((key, value) => <img src={URL.createObjectURL(value)} width="200" onLoad={URL.revokeObjectURL(this)}/>) : <img src="/stock-images/upload-image-holder.png" width="200px"/>} */}
              { global.uploadedPhotos ? global.uploadedPhotos.map((url, i) => <img src={url} alt="rental property calculator images" key={i} height="200" /> ) : <img src="/stock-images/upload-image-holder.png" width="200" alt="rental property calculator stock image"/> }
            </div>
          </div>
            
          <div className={styles.printButtonContainer}>
            <Link href="/results"><button id="printButton" className="button">Print Results</button></Link>
            {/* <Link href="/results"><a target="_blank"><button id="printButton" className="button">Print Results</button></a></Link> */}
          </div>

      </div>
      
      <div className={`${styles.results_container}`}>
        <Results />
      </div>

    </div>

  )
}