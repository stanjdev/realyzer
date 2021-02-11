/* eslint-disable react/react-in-jsx-scope */
import styles from '../styles/Home.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../redux/ValuesReducer';
import { useEffect, useContext } from 'react';
import Link from 'next/link';
import Results from './Results';
import { LightContext } from '../components/LightContext';
import Map from '../components/Map';

import IntInput from './IntInput/IntInput';
import MortgageCalculator from './MortgageCalculator/MortgageCalculator';

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
    if (dataObject) {
      dispatch(changeValue(dataObject, 'propertyTaxRates'))
    }
  };
  
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


  function handleChange(e) {
    // https://reactjs.org/docs/forms.html
    /* const { name, value, type, checked } = event.target 
    (event.target will hold whatever attributes of 
    the element you click, or target) */
    const { value, name } = e.target
    dispatch(changeValue(value, name))
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


  // Clicking info popups
  const handleClick = e => {
    e.currentTarget.children[0].classList.toggle(styles.show)
  }


  // Setting uploaded logo image
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



  // // image scraper client-side
  // useEffect(() => {
  //   console.log(global.url)
  //   console.log(global.imgs.length)
  // }, [global.imgs])

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

          <IntInput 
            title="Purchase Price"
            symbol="$"
            inputName="purchasePrice" 
            inputType="number" 
            inputValue={global.purchasePrice}
            onChange={handleChange} 
            placeholder="$650,000" 
            required={true}
            inlineStyle={{width: "130px"}}
          />
        
        <Map />

        <MortgageCalculator />

          <IntInput 
            title="Rental Income"
            subTitle="Per Month"
            symbol="$"
            inputName="rent" 
            inputType="number" 
            inputValue={global.rent}
            onChange={handleChange} 
            placeholder="0" 
            required={true}
          />

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



          {/* PERCENTAGE INPUTS */}
          <IntInput 
            title="Closing Costs"
            subTitle="Typically 3-7% of Purchase Price"
            symbol="%"
            inputName="closingCosts" 
            maxLength="3" 
            defaultValue="" 
            inputType="text" 
            onChange={handleChange} 
            placeholder="e.g. 4" 
            required={true}
            styling={`${styles.percentInput}`} 
            autoComplete="off"
          />

          <IntInput 
            title="Upfront Repairs (Rehab Budget)"
            subTitle="% of Purchase Price"
            symbol="%"
            inputName="upfrontRepairs" 
            maxLength="3" 
            defaultValue="" 
            inputValue={global.upfrontRepairs}
            inputType="text" 
            onChange={handleChange} 
            placeholder="0" 
            required={true}
            styling={`${styles.percentInput}`} 
            autoComplete="off"
          />

          <IntInput 
            title="Repairs &#38; Maintenance"
            subTitle="Typically 5-15% of Monthly Income"
            symbol="%"
            inputName="repairs" 
            maxLength="3" 
            defaultValue="" 
            inputType="text" 
            onChange={handleChange} 
            placeholder="e.g. 5" 
            required={true}
            styling={`${styles.percentInput}`} 
            autoComplete="off"
          />

          <IntInput 
            title="Vacancy Allowance"
            subTitle="Typically 3-10% of Monthly Income"
            symbol="%"
            inputName="vacancy" 
            maxLength="3" 
            defaultValue="" 
            inputType="text" 
            onChange={handleChange} 
            placeholder="e.g. 5" 
            required={true}
            styling={`${styles.percentInput}`} 
            autoComplete="off"
          />
          
          <IntInput 
            title="Capital Expenditures (CapEx)"
            subTitle="Typically 5-15% of Monthly Income"
            symbol="%"
            inputName="capEx" 
            maxLength="3" 
            defaultValue="" 
            inputType="text" 
            onChange={handleChange} 
            placeholder="e.g. 7" 
            required={true}
            styling={`${styles.percentInput}`} 
            autoComplete="off"
          />

          <IntInput 
            title="Management Fees"
            subTitle="Typically 7-12% of Monthly Income"
            symbol="%"
            inputName="mgmtFees" 
            maxLength="3" 
            defaultValue="" 
            inputType="text" 
            onChange={handleChange} 
            placeholder="e.g. 10" 
            required={true}
            styling={`${styles.percentInput}`} 
            autoComplete="off"
          />



          {/* BILLS INPUTS */}
          <IntInput 
            title="Electricity"
            subTitle="Monthly Electric Bill"
            symbol="$"
            inputName="electricity"
            inputValue={global.electricity}
            inputType="number" 
            onChange={handleChange}
          />

          <IntInput 
            title="Gas"
            subTitle="Monthly Gas Bill"
            symbol="$"
            inputName="gas"
            inputValue={global.gas}
            inputType="number" 
            onChange={handleChange}
          />

          <IntInput 
            title="Water/Sewer"
            subTitle="Monthly Water/Sewer Bill"
            symbol="$"
            inputName="water"
            inputValue={global.water}
            inputType="number" 
            onChange={handleChange}
          />

          <IntInput 
            title="Garbage"
            subTitle="Monthly Garbage Bill"
            symbol="$"
            inputName="garbage"
            inputValue={global.garbage}
            inputType="number" 
            onChange={handleChange}
          />

          <IntInput 
            title="HOA Fees"
            subTitle="Monthly HOA Dues"
            symbol="$"
            inputName="hoa"
            inputValue={global.hoa}
            inputType="number" 
            onChange={handleChange}
          />

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
};