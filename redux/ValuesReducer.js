// Action TYPES
const CHANGE_VALUE = "CHANGE_VALUE";


// Action Creators
export const changeValue = (value, name) => {
  return {
    type: CHANGE_VALUE,
    payload: value,
    name: name
  }
}


// initialState
const initialState = {
  url: "",
  address: "",
  purchasePrice: 0,
  downPaymentPercent: 20,
  downPayment: 0,
  interestRate: 4,
  loanTerm: 360,
  mortgagePayments: 0,
  rent: 0,
  propertyTaxes: 0,
  propertyTaxFrequency: 1,
  americanState: "California",
  propertyTaxRates: {},
  insurance: 0,
  insuranceFrequency: 1,
  closingCosts: 0,
  upfrontRepairs: 0,
  repairs: 0,
  vacancy: 0,
  capEx: 0,
  mgmtFees: 0,
  electricity: 0,
  gas: 0,
  water: 0,
  garbage: 0,
  hoa: 0,
  logo: "",
  imgs: [],
  uploadedPhotos: "",
  mapSnapShot: "",
  map: ""
}


// Reducer
export default function ValuesReducer(state=initialState, action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.payload
      }
  
    default:
      return state;
  }
}
