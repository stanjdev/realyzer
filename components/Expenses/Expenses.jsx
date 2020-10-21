import React, {useState} from 'react';
// import styles from './Expenses.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../../redux/ExpensesReducer';

export default function Expenses() {
  const globalState = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  const [textAreaValue, setTextAreaValue] = useState();
  
  // useEffect(() => {
  //   console.log(globalState.purchasePrice);
  // }, [])

  const handleChange = (e) => {
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
    console.log("$" + globalState.propertyValue);
  }
  

  const handleTextAreaValueChange = e => {
    setTextAreaValue(e.target.value);
  }

  
  return (
    <div>
      <h2>Expenses</h2>
      <form className="expenses" onSubmit={handleSubmit}>

        <label htmlFor="purchasePrice">
          Purchase Price:
          <input 
            name="purchasePrice" 
            required 
            type="number" 
            // defaultValue={globalState.purchasePrice} 
            // value={globalState.purchasePrice} 
            onChange={handleChange}
            placeholder="Purchase Price" 
          />
          <span>{`Purchase Price: ${globalState.purchasePrice}`}</span>
        </label>

        <label>
          Down Payment: {`${globalState.downPaymentPercent}%`}
          <input 
            name="downPaymentPercent" 
            required 
            type="number" 
            onChange={handleChange}
            value={globalState.downPaymentPercent}
          />
          <input 
            name="downPaymentPercent"
            type="range"
            onChange={handleChange}
            value={globalState.downPaymentPercent}
          />
          <span>{`Down Payment: ${(globalState.purchasePrice * globalState.downPaymentPercent) / 100}`}</span>
        </label>


        <label>
          Rent (Rental Income)
          <input 
            name="rent" 
            required 
            type="number" 
            onChange={handleChange}
            placeholder="Rent"
          />
          <span>{`Rental Income: ${globalState.rent}`}</span>
        </label>


        <label>
          Property Taxes:
          <input 
            name="propertyTaxes"
            // defaultValue={globalState.propertyTaxes} 
            type="number" 
            onChange={handleChange} 
            placeholder="Property Taxes" 
            required 
          />
          <select name="propertyTaxFrequency" value={globalState.propertyTaxFrequency} onChange={handleChange}>
            <option value="1">Annual</option>
            <option value="12">Monthly</option>
          </select>
          <span>{`Property Taxes total: ${globalState.propertyTaxes * globalState.propertyTaxFrequency}`}</span>
        </label>

        {/* <input type="file"/> */}

        <label>
          Insurance:
          <input 
            name="insurance" 
            // value={globalState.insurance} 
            type="number" 
            onChange={handleChange} 
            placeholder="Insurance" 
            required 
          />
          <select name="insuranceFrequency" value={globalState.insuranceFrequency} onChange={handleChange}>
            <option value="1">Annual</option>
            <option value="12">Monthly</option>
          </select>
          <span>{`Insurance total: ${globalState.insurance * globalState.insuranceFrequency}`}</span>
        </label>

        <label>
          {`Repairs & Maintenance (% of monthly income):`}
          <input name="repairs" defaultValue="" type="number" onChange={handleChange} placeholder={`Repairs & Maintenance`} required />
          <span>{`Repairs & Maintenance total: ${(globalState.repairs * globalState.rent) / 100}`}</span>
        </label>

        <label>
          Vacancy (% of monthly income):
          <input name="vacancy" defaultValue="" type="number" onChange={handleChange} placeholder="Vacancy" required />
          <span>{`Vacancy total: ${(globalState.vacancy * globalState.rent) / 100}`}</span>
        </label>

        <label>
          Capital Expenditures (CapEx):
          <input name="capEx" defaultValue="" type="number" onChange={handleChange} placeholder="CapEx" required />
          <span>{`Capital Expenditures total: ${(globalState.capEx * globalState.rent) / 100}`}</span>
        </label>

        <label>
          Management Fees:
          <input name="mgmtFees" defaultValue="" type="number" onChange={handleChange} placeholder="Management Fees" required />
          <span>{`Management Fees total: ${(globalState.mgmtFees * globalState.rent / 100)}`}</span>
        </label>



        <label>
          Electricity:
          <input name="electricity" defaultValue="" type="number" onChange={handleChange} placeholder="Electricity" required />
          <span>{`Electricity: ${globalState.electricity}`}</span>
        </label>

        <label>
          Gas:
          <input name="gas" defaultValue="" type="number" onChange={handleChange} placeholder="Gas" required />
          <span>{`Gas: ${globalState.gas}`}</span>
        </label>

        <label>
          Water/Sewer:
          <input name="water" defaultValue="" type="number" onChange={handleChange} placeholder="Water" required />
          <span>{`Water/Sewage: ${globalState.water}`}</span>
        </label>

        <label>
          Garbage:
          <input name="garbage" defaultValue="" type="number" onChange={handleChange} placeholder="Garbage" required />
          <span>{`Garbage: ${globalState.garbage}`}</span>
        </label>

        <label>
          HOA Fees:
          <input name="hoa" defaultValue="" type="number" onChange={handleChange} placeholder="HOA Dues" required />
          <span>{`HOA Fees: ${globalState.hoa}`}</span>
        </label>
  


        <label>
          Checkbox
          <input type="checkbox" onChange={handleCheckboxChange}/>
        </label>
  

        <input type="submit" value="Submit" />

      </form>
  
      
      <div style={{fontWeight: "bold"}}>{`total: ${
        globalState.propertyTaxes +
        globalState.insurance + 
        (globalState.repairs * globalState.rent) / 100 +
        (globalState.vacancy * globalState.rent) / 100 +
        (globalState.capEx * globalState.rent) / 100 +
        (globalState.mgmtFees * globalState.rent) / 100
      }`}</div>


      <label>
        Additional notes about the property:
        <textarea value={textAreaValue} onChange={handleTextAreaValueChange}></textarea>
        <span>{textAreaValue}</span>
      </label>

    </div>
  )
}